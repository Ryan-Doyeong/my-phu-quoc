"use server";

import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, checkSpam } from '@/lib/rateLimit';

export async function submitPartnerApplication(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Anti-spam checks (honeypot + 2s submission speed check)
    if (checkSpam(formData)) {
      return { success: true };
    }

    // Rate limiting: 5 per hour for partner applications
    await checkRateLimit(5, 'partner_application');

    const supabase = await createClient();

    function str(v: FormDataEntryValue | null) {
      return typeof v === 'string' ? v.trim() : '';
    }

    const lang = str(formData.get('lang')) === 'vi' ? 'vi' : 'en';
    const isVi = lang === 'vi';

    const businessId = str(formData.get('business_id'));
    const unlistedName = str(formData.get('unlisted_business_name'));
    const unlistedMapsUrl = str(formData.get('unlisted_maps_url'));
    const contactName = str(formData.get('contact_name'));
    const email = str(formData.get('contact_email')).toLowerCase();
    const phone = str(formData.get('contact_phone'));
    const slot = str(formData.get('slot'));
    const startMonth = str(formData.get('start_month'));
    const needsBanner = formData.get('needs_banner') === 'on' || formData.get('needs_banner') === 'true';
    const message = str(formData.get('message'));
    const agreed = formData.get('agreed_promises') === 'on' || formData.get('agreed_promises') === 'true';

    // Required fields check
    if (!contactName || !email || !phone || !slot) {
      throw new Error(
        isVi
          ? 'Vui lòng điền đầy đủ các thông tin bắt buộc.'
          : 'Please fill in all required fields.'
      );
    }

    const validSlots = ['featured', 'food', 'fitness', 'cafe', 'community'];
    if (!validSlots.includes(slot)) {
      throw new Error(
        isVi ? 'Vị trí đã chọn không hợp lệ.' : 'Invalid slot selected.'
      );
    }

    if (!agreed) {
      throw new Error(
        isVi
          ? 'Vui lòng đồng ý với các cam kết đối tác.'
          : 'Please agree to the partner promises.'
      );
    }

    // Either business_id or unlisted_business_name must be present
    const hasValidBusinessId = businessId && businessId !== 'unlisted' && businessId !== 'other';
    const hasUnlistedName = unlistedName && unlistedName.length > 0;

    if (!hasValidBusinessId && !hasUnlistedName) {
      throw new Error(
        isVi
          ? 'Vui lòng chọn doanh nghiệp trong danh bạ hoặc nhập tên doanh nghiệp của bạn.'
          : 'Please select your listed business or enter your business name.'
      );
    }

    // Length checks matching DB constraints
    if (contactName.length > 200) {
      throw new Error(
        isVi
          ? 'Họ tên quá dài (tối đa 200 ký tự).'
          : 'Contact name is too long (max 200 chars).'
      );
    }
    if (email.length > 320) {
      throw new Error(isVi ? 'Email quá dài.' : 'Email is too long.');
    }
    if (phone.length > 100) {
      throw new Error(isVi ? 'Số điện thoại quá dài.' : 'Phone number is too long.');
    }
    if (message.length > 2000) {
      throw new Error(
        isVi
          ? 'Lời nhắn quá dài (tối đa 2000 ký tự).'
          : 'Message is too long (max 2000 chars).'
      );
    }
    if (unlistedName.length > 200) {
      throw new Error(
        isVi
          ? 'Tên doanh nghiệp quá dài (tối đa 200 ký tự).'
          : 'Business name is too long (max 200 chars).'
      );
    }
    if (unlistedMapsUrl.length > 1000) {
      throw new Error(
        isVi
          ? 'Link Google Maps quá dài (tối đa 1000 ký tự).'
          : 'Google Maps link is too long (max 1000 chars).'
      );
    }

    // 2. Banner image upload
    let bannerPath: string | null = null;
    const bannerFile = formData.get('banner_file');

    if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
      if (bannerFile.size > 10_000_000) {
        throw new Error(
          isVi
            ? 'Hình banner phải nhỏ hơn 10 MB.'
            : 'Banner image must be under 10 MB.'
        );
      }

      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
      const rawExt = bannerFile.name.split('.').pop()?.toLowerCase() || '';
      const allowedExts = ['jpg', 'jpeg', 'png', 'webp'];

      if (!allowedMimes.includes(bannerFile.type.toLowerCase()) && !allowedExts.includes(rawExt)) {
        throw new Error(
          isVi
            ? 'Chỉ chấp nhận tệp JPG, PNG và WebP.'
            : 'Only JPG, PNG, and WebP files are allowed.'
        );
      }

      const ext = rawExt === 'jpeg' ? 'jpg' : (rawExt || 'jpg');
      const uploadPath = `sponsor-intake/${crypto.randomUUID()}.${ext}`;

      const buffer = Buffer.from(await bannerFile.arrayBuffer());
      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(uploadPath, buffer, {
          contentType: bannerFile.type || `image/${ext}`,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(
          isVi
            ? `Tải lên hình banner thất bại: ${uploadError.message}`
            : `Banner upload failed: ${uploadError.message}`
        );
      }

      bannerPath = uploadPath;
    }

    // 3. Insert record into sponsor_applications
    // NOTE: do NOT send status, review_note, reviewed_by, reviewed_at
    const payload = {
      business_id: hasValidBusinessId ? businessId : null,
      unlisted_business_name: hasValidBusinessId ? null : unlistedName,
      unlisted_maps_url: hasValidBusinessId ? null : (unlistedMapsUrl || null),
      contact_name: contactName,
      email: email,
      phone: phone,
      slot: slot,
      start_month: startMonth || null,
      banner_path: bannerPath,
      needs_banner: needsBanner,
      message: message || null,
      lang: lang,
      agreed: true,
    };

    const { error: insertError } = await supabase
      .from('sponsor_applications')
      .insert(payload);

    if (insertError) {
      throw new Error(
        isVi
          ? `Lưu đơn đăng ký thất bại: ${insertError.message}`
          : `Failed to save application: ${insertError.message}`
      );
    }

    return { success: true };
  } catch (err: any) {
    console.error('submitPartnerApplication error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Submission failed. Please try again.',
    };
  }
}

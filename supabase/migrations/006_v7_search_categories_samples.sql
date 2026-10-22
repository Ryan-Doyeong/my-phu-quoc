-- v7: searchable category taxonomy, illustrative media disclosure, richer demo profiles
alter table public.businesses add column if not exists tags text[] not null default '{}';
alter table public.businesses add column if not exists media_note text;
alter table public.businesses add column if not exists is_sample boolean not null default false;

-- Preserve existing specialty/cuisine labels as searchable tags before normalizing the main type.
update public.businesses
set tags = array_remove(array[
  case when subcategory is not null and btrim(subcategory)<>'' then subcategory end,
  case when category='food' and subcategory in ('Japanese','Korean','Vietnamese','Thai','Italian','Asian') then subcategory end,
  case when category='food' and subcategory='Pizza' then 'Italian' end,
  case when category='food' and subcategory='Vegetarian' then 'Vegetarian' end,
  case when category='wellness' and subcategory is not null then subcategory end
], null)
where coalesce(array_length(tags,1),0)=0;

-- Food & Dining: main venue type in subcategory, cuisine/specialty in tags.
update public.businesses set subcategory='Restaurant' where category='food' and subcategory in ('Japanese','Korean','Vietnamese','Thai','Italian','Asian','Pizza','Grill','Restaurant');
update public.businesses set subcategory='Cafe' where category='food' and subcategory in ('Cafe','Cafe & Lounge','Cafe & Bistro','Pet Cafe');
update public.businesses set subcategory='Bakery' where category='food' and subcategory='Bakery & Cafe';
update public.businesses set subcategory='Healthy Food' where category='food' and subcategory in ('Healthy Food','Healthy Breakfast','Vegetarian');
update public.businesses set subcategory='Brunch' where category='food' and subcategory='Brunch';
update public.businesses set tags=array_cat(tags,array['Japanese']) where category='food' and (public_name ilike '%sushi%' or public_name ilike '%yakiuo%' or public_name ilike '%mikado%') and not ('Japanese'=any(tags));
update public.businesses set tags=array_cat(tags,array['Korean']) where category='food' and (public_name ilike '%korean%' or public_name ilike '%kimchi%') and not ('Korean'=any(tags));
update public.businesses set tags=array_cat(tags,array['Cafe']) where category='food' and subcategory='Cafe' and not ('Cafe'=any(tags));
update public.businesses set tags=array_cat(tags,array['Brunch']) where category='food' and subcategory='Brunch' and not ('Brunch'=any(tags));
update public.businesses set tags=array_cat(tags,array['Healthy']) where category='food' and subcategory='Healthy Food' and not ('Healthy'=any(tags));

-- Wellness: practical browsing taxonomy.
update public.businesses set subcategory='Circuit Training', tags=array_cat(tags,array['Boxing Fitness','Circuit Training']) where category='wellness' and public_name ilike '%9ROUND%';
update public.businesses set subcategory='Circuit Training', tags=array_cat(tags,array['Circuit Training','Strength']) where category='wellness' and public_name ilike '%LAVA Fitness%';
update public.businesses set subcategory='Functional Training', tags=array_cat(tags,array['Functional Training','Strength']) where category='wellness' and (public_name ilike '%MOVE Fitness%' or public_name ilike '%Train With Primal%');
update public.businesses set subcategory='Gym' where category='wellness' and subcategory in ('Gym','Fitness','Gym & Yoga','Gym & Training');
update public.businesses set subcategory='Yoga' where category='wellness' and subcategory in ('Yoga','Yoga & Wellness');
update public.businesses set subcategory='Pilates' where category='wellness' and subcategory='Pilates';
update public.businesses set subcategory='Massage' where category='wellness' and subcategory in ('Massage','Massage & Recovery','Skin Care & Massage');
update public.businesses set subcategory='Recovery' where category='wellness' and subcategory in ('Recovery','Sports Stretching','Therapy');
update public.businesses set subcategory='Spa' where category='wellness' and subcategory in ('Spa','Spa & Sauna','Salon & Spa','Beauty & Spa','Wellness Spa');
update public.businesses set subcategory='Clinic' where category='wellness' and subcategory='Clinic & Spa';
update public.businesses set subcategory='Beauty' where category='wellness' and subcategory in ('Beauty','Beauty & Therapy','Skin Care','Beauty & Wellness');
update public.businesses set tags=array_cat(tags,array['Waxing']) where category='wellness' and subcategory='Waxing' and not ('Waxing'=any(tags));

-- Use high-resolution category visuals for launch-import rows. These are explicitly labeled as illustrative.
update public.businesses set gallery_urls=case
  when category='food' and ('Japanese'=any(tags)) then array['/images/v7/japanese-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' and ('Korean'=any(tags)) then array['/images/v7/korean-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/brunch-hq.jpg']
  when category='food' and ('Italian'=any(tags) or 'Pizza'=any(tags)) then array['/images/v7/italian-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' and subcategory='Cafe' then array['/images/v7/cafe-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/restaurant-hq.jpg']
  when category='food' and subcategory='Brunch' then array['/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg','/images/v7/healthy-food-hq.jpg']
  when category='food' and subcategory='Healthy Food' then array['/images/v7/healthy-food-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' then array['/images/v7/restaurant-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='wellness' and subcategory='Yoga' then array['/images/v7/yoga-hq.jpg','/images/v7/pilates-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Pilates' then array['/images/v7/pilates-hq.jpg','/images/v7/yoga-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Circuit Training' then array['/images/v7/circuit-hq.jpg','/images/v7/gym-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Functional Training' then array['/images/v7/crossfit-hq.jpg','/images/v7/gym-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Massage' then array['/images/v7/massage-hq.jpg','/images/v7/spa-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Recovery' then array['/images/v7/recovery-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/gym-hq.jpg']
  when category='wellness' and subcategory='Clinic' then array['/images/v7/clinic-hq.jpg','/images/v7/spa-hq.jpg','/images/v7/community-hq.jpg']
  when category='wellness' and subcategory in ('Spa','Beauty','Waxing') then array['/images/v7/spa-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/recovery-hq.jpg']
  else array['/images/v7/gym-hq.jpg','/images/v7/crossfit-hq.jpg','/images/v7/recovery-hq.jpg'] end,
  media_note='Illustrative category imagery is used for this launch profile until venue-supplied or appropriately licensed photography is added.'
where source_label='Google Maps 4.0+ sample import';

-- Rich illustrative profiles: deliberately marked as sample data, not statements about real venues.
update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A bright neighborhood movement studio designed for residents who want practical, coach-led training without a large-club atmosphere. The sample profile demonstrates how a real listing can explain training style, facilities, schedule, pricing context and who the venue may suit.',
  subcategory='Functional Training',tags=array['Functional Training','Strength','Small Group','Beginner Friendly'],price_level='₫₫',
  services='["Strength & conditioning","Small-group training","Mobility sessions","Personal coaching"]'::jsonb,
  highlights='["Small class format","English-friendly coaching","Beginner onboarding","Morning and evening sessions"]'::jsonb,
  amenities='{"changing_area":"Available","showers":"Available","water_refill":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Mon–Fri":"06:00–21:00","Sat":"07:00–18:00","Sun":"08:00–14:00"}'::jsonb,
  gallery_urls=array['/images/v7/gym-hq.jpg','/images/v7/crossfit-hq.jpg','/images/v7/recovery-hq.jpg']
where slug='movement-studio-thao-dien';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A calm reformer Pilates concept with a focus on controlled movement, posture and sustainable training. This demo page shows how instructors, class formats, first-visit guidance and practical booking details can be presented clearly.',
  subcategory='Pilates',tags=array['Pilates','Reformer','Private Sessions','Beginner Friendly'],price_level='₫₫₫',
  services='["Reformer classes","Private Pilates","Introductory sessions","Mobility-focused practice"]'::jsonb,
  highlights='["Small classes","Quiet studio setting","Beginner introduction","English-friendly instruction"]'::jsonb,
  amenities='{"changing_area":"Available","towels":"Available","water":"Available","booking":"Recommended"}'::jsonb,
  opening_hours='{"Mon–Fri":"07:00–21:00","Sat–Sun":"08:00–18:00"}'::jsonb,
  gallery_urls=array['/images/v7/pilates-hq.jpg','/images/v7/yoga-hq.jpg','/images/v7/recovery-hq.jpg']
where slug='river-pilates';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A recovery-focused concept for active residents and desk workers, combining assisted mobility, sports-style bodywork and post-training reset sessions. The demo profile illustrates how treatment focus, session length and facilities can be explained.',
  subcategory='Recovery',tags=array['Recovery','Sports Massage','Mobility','Stretching'],price_level='₫₫',
  services='["Assisted stretching","Sports-style massage","Mobility reset","Post-training recovery"]'::jsonb,
  highlights='["Active-lifestyle focus","Private treatment space","Appointment based","Short recovery sessions available"]'::jsonb,
  amenities='{"private_rooms":"Available","towels":"Available","water":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Daily":"09:00–21:00"}'::jsonb,
  gallery_urls=array['/images/v7/recovery-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/gym-hq.jpg']
where slug='tropic-recovery';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A leafy neighborhood brunch concept for coffee, breakfast plates and relaxed weekend catch-ups. This demo listing shows how a café can present atmosphere, meal style, family suitability, booking expectations and practical visit information.',
  subcategory='Brunch',tags=array['Brunch','Cafe','Family Friendly','Outdoor Seating'],price_level='₫₫',
  services='["Breakfast","Brunch","Specialty coffee","Dessert","Takeaway"]'::jsonb,
  highlights='["Outdoor seating","Good for weekend brunch","Family-friendly layout","Casual group dining"]'::jsonb,
  amenities='{"wifi":"Available","air_conditioning":"Available","outdoor_seating":"Available","pet_friendly":"Selected outdoor seats"}'::jsonb,
  opening_hours='{"Daily":"08:00–22:00"}'::jsonb,
  gallery_urls=array['/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg','/images/v7/restaurant-hq.jpg']
where slug='courtyard-brunch';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A light all-day food concept built around breakfast bowls, eggs, fruit, coffee and easy weekday meals. The sample page demonstrates how dietary options, takeaway, price context and family-friendly details can be displayed.',
  subcategory='Healthy Food',tags=array['Healthy','Breakfast','Coffee','Takeaway'],price_level='₫₫',
  services='["Breakfast bowls","Egg dishes","Salads","Coffee","Takeaway"]'::jsonb,
  highlights='["Quick breakfast","Lighter meal options","Casual weekday stop","Family friendly"]'::jsonb,
  amenities='{"wifi":"Available","air_conditioning":"Available","takeaway":"Available","street_level_access":"Yes"}'::jsonb,
  opening_hours='{"Daily":"07:00–17:00"}'::jsonb,
  gallery_urls=array['/images/v7/healthy-food-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
where slug='morning-bowl';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A modern Vietnamese neighborhood dining concept for lunch and dinner, with familiar flavors presented in a comfortable setting. The demo page shows how cuisine, group suitability, atmosphere, price range and booking details can be structured.',
  subcategory='Restaurant',tags=array['Vietnamese','Restaurant','Dinner','Groups'],price_level='₫₫₫',
  services='["Vietnamese lunch","Dinner","Shared dishes","Group dining"]'::jsonb,
  highlights='["Modern Vietnamese style","Good for small groups","Comfortable dining room","Dinner reservations accepted"]'::jsonb,
  amenities='{"air_conditioning":"Available","group_tables":"Available","card_payment":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Daily":"11:00–22:30"}'::jsonb,
  gallery_urls=array['/images/v7/restaurant-hq.jpg','/images/v7/korean-hq.jpg','/images/v7/brunch-hq.jpg']
where slug='lotus-table';

-- Replace sponsor placeholders with the new high-resolution visual set and fill all seven main slots.
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] insert into public.sponsor_banners(slot_key,size,title,subtitle,image_url,target_url,is_active,sort_order) values
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-1','main','Local Living Partner','A featured space for neighborhood brands that support the community.','/images/v7/sponsor-main-1.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-2','main','Wellness Community Partner','Move, recover and live well in Thao Dien.','/images/v7/sponsor-main-2.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-3','main','Food & Dining Partner','A spotlight for restaurants and hospitality partners.','/images/v7/sponsor-main-3.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-4','main','Active Life Partner','Supporting healthier everyday routines.','/images/v7/sponsor-main-4.jpg','#',true,4),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-5','main','Neighborhood Café Partner','Good coffee, local stories and community connection.','/images/v7/sponsor-main-5.jpg','#',true,5),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-6','main','Recovery & Care Partner','Wellbeing services for everyday life.','/images/v7/sponsor-main-6.jpg','#',true,6),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('main-7','main','Community Partner','Local support for a brighter Thao Dien.','/images/v7/sponsor-main-7.jpg','#',true,7),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('small-1','small','Food Partner',null,'/images/v7/sponsor-small-1.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('small-2','small','Fitness Partner',null,'/images/v7/sponsor-small-2.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('small-3','small','Café Partner',null,'/images/v7/sponsor-small-3.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] ('small-4','small','Community Partner',null,'/images/v7/sponsor-small-4.jpg','#',true,4)
-- [MyPhuQuoc Phase0 disabled: Thaodien sample] on conflict(slot_key) do update set title=excluded.title,subtitle=excluded.subtitle,image_url=excluded.image_url,target_url=excluded.target_url,is_active=excluded.is_active,sort_order=excluded.sort_order,updated_at=now();

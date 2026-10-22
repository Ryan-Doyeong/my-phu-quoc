"use client";

import { useState } from 'react';
import Link from 'next/link';
import { updateSponsorApplicationStatus } from '@/app/actions';

export type SponsorApplication = {
  id: string;
  business_id: string | null;
  unlisted_business_name: string | null;
  unlisted_maps_url: string | null;
  contact_name: string;
  email: string;
  phone: string;
  slot: 'featured' | 'food' | 'fitness' | 'cafe' | 'community';
  start_month: string | null;
  banner_path: string | null;
  needs_banner: boolean;
  message: string | null;
  lang: 'en' | 'vi';
  agreed: boolean;
  status: 'pending' | 'reserved' | 'approved' | 'rejected' | 'cancelled';
  review_note: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  businesses?: {
    id: string;
    public_name: string;
    slug: string;
  } | null;
};

const SLOT_LABELS: Record<string, string> = {
  featured: 'Featured Partner',
  food: 'Food Partner',
  fitness: 'Fitness Partner',
  cafe: 'Café Partner',
  community: 'Community Partner',
};

const SUPABASE_MEDIA_BASE = 'https://trsghkrfccufpvcbqrab.supabase.co/storage/v1/object/public/site-media';

export function SponsorApplicationsList({
  applications,
}: {
  applications: SponsorApplication[];
}) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const pendingCount = applications.filter((x) => x.status === 'pending').length;
  const reservedCount = applications.filter((x) => x.status === 'reserved').length;
  const approvedCount = applications.filter((x) => x.status === 'approved').length;

  return (
    <div className="sponsorAppsContainer">
      <div className="sponsorAppsHeader">
        <div className="sponsorAppsStats">
          <span className="statBadge">
            Total: <strong>{applications.length}</strong>
          </span>
          <span className="statBadge pending">
            Pending: <strong>{pendingCount}</strong>
          </span>
          <span className="statBadge reserved">
            Reserved: <strong>{reservedCount}</strong>
          </span>
          <span className="statBadge approved">
            Approved: <strong>{approvedCount}</strong>
          </span>
        </div>

        <div className="sponsorAppsFilter">
          <label htmlFor="status_filter">Filter status:</label>
          <select
            id="status_filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All statuses ({applications.length})</option>
            <option value="pending">Pending ({pendingCount})</option>
            <option value="reserved">Reserved ({reservedCount})</option>
            <option value="approved">Approved ({approvedCount})</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="emptyState">
          <p>No sponsor applications found.</p>
        </div>
      ) : (
        <div className="sponsorAppsGrid">
          {filtered.map((app) => {
            const isListed = Boolean(app.businesses?.public_name);
            const businessName = isListed
              ? app.businesses?.public_name
              : app.unlisted_business_name || 'Unnamed business';
            const bannerUrl = app.banner_path
              ? `${SUPABASE_MEDIA_BASE}/${app.banner_path}`
              : null;

            return (
              <article key={app.id} className={`sponsorAppCard status-${app.status}`}>
                <div className="appCardHead">
                  <div className="appCardHeadLeft">
                    <span className={`statusPill ${app.status}`}>
                      {app.status.toUpperCase()}
                    </span>
                    <span className="slotPill">
                      {SLOT_LABELS[app.slot] || app.slot}
                    </span>
                    <span className="langPill">
                      {app.lang.toUpperCase()}
                    </span>
                  </div>
                  <time className="appDate" dateTime={app.created_at}>
                    {new Date(app.created_at).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>

                <div className="appCardBody">
                  <div className="appBusinessRow">
                    <h3 className="appBusinessName">
                      {isListed && app.businesses?.slug ? (
                        <Link
                          href={`/business/${app.businesses.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {businessName} ↗
                        </Link>
                      ) : (
                        <span>{businessName}</span>
                      )}
                    </h3>
                    {!isListed && (
                      <span className="badgeNotListed">Not listed</span>
                    )}
                    {app.unlisted_maps_url && (
                      <a
                        href={app.unlisted_maps_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mapsLink"
                      >
                        Google Maps ↗
                      </a>
                    )}
                  </div>

                  <div className="appDetailsGrid">
                    <div>
                      <span className="detailLabel">Preferred Start:</span>
                      <strong>{app.start_month || 'As soon as approved'}</strong>
                    </div>
                    <div>
                      <span className="detailLabel">Contact Person:</span>
                      <strong>{app.contact_name}</strong>
                    </div>
                    <div>
                      <span className="detailLabel">Email:</span>
                      <a href={`mailto:${app.email}`} className="textLink">
                        {app.email}
                      </a>
                    </div>
                    <div>
                      <span className="detailLabel">Phone / Zalo:</span>
                      <a href={`tel:${app.phone}`} className="textLink">
                        {app.phone}
                      </a>
                    </div>
                  </div>

                  <div className="appBannerInfo">
                    <span className="detailLabel">Banner:</span>
                    {bannerUrl ? (
                      <a
                        href={bannerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bannerViewLink"
                      >
                        🖼️ View uploaded banner ↗
                      </a>
                    ) : app.needs_banner ? (
                      <span className="badgeNeedsBanner">
                        🎨 Needs banner created
                      </span>
                    ) : (
                      <span className="mutedText">No banner provided</span>
                    )}
                  </div>

                  {app.message && (
                    <div className="appMessage">
                      <span className="detailLabel">Message:</span>
                      <p>{app.message}</p>
                    </div>
                  )}

                  {app.review_note && (
                    <div className="appCurrentNote">
                      <span className="detailLabel">Staff Note:</span>
                      <p>{app.review_note}</p>
                    </div>
                  )}
                </div>

                <div className="appCardFooter">
                  <form
                    action={async (fd) => {
                      setUpdatingId(app.id);
                      try {
                        await updateSponsorApplicationStatus(fd);
                      } finally {
                        setUpdatingId(null);
                      }
                    }}
                    className="statusUpdateForm"
                  >
                    <input type="hidden" name="id" value={app.id} />
                    <div className="statusFormInputs">
                      <label>
                        <span>Change status:</span>
                        <select name="status" defaultValue={app.status}>
                          <option value="pending">pending</option>
                          <option value="reserved">reserved</option>
                          <option value="approved">approved</option>
                          <option value="rejected">rejected</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </label>
                      <label className="noteInputLabel">
                        <span>Review note:</span>
                        <input
                          type="text"
                          name="review_note"
                          defaultValue={app.review_note || ''}
                          placeholder="e.g. Contacted via Zalo, approved for Nov 2026"
                        />
                      </label>
                      <button
                        type="submit"
                        className="primaryButton smallBtn"
                        disabled={updatingId === app.id}
                      >
                        {updatingId === app.id ? 'Saving…' : 'Update'}
                      </button>
                    </div>
                  </form>

                  {app.reviewed_at && (
                    <small className="reviewedTimestamp">
                      Last reviewed on{' '}
                      {new Date(app.reviewed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </small>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

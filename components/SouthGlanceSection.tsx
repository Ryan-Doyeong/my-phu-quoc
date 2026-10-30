import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface SouthGlanceSectionProps {
  locale?: Locale
}

export function SouthGlanceSection({ locale = 'en' }: SouthGlanceSectionProps) {
  const dict = getDictionary(locale)
  const sg = dict.home

  return (
    <section className="southGlanceSection" id="south-glance">
      <div className="sectionTitleArea">
        <span className="sectionBadge">{sg.southGlanceBadge}</span>
        <h3>{sg.southGlanceTitle}</h3>
        <p>{sg.southGlanceDesc}</p>
      </div>

      {/* Overview Map Card with HTML Overlay */}
      <div className="overviewMapWrap">
        <div className="mapStage">
          {/* Standalone SVG Map (Pure Geometry, ZERO text inside SVG) */}
          <img
            src="/maps/south_overview_map_v5.svg"
            alt="South Phu Quoc Overview Map"
            className="mapStageSvg"
            loading="lazy"
            decoding="async"
          />

          {/* HTML/CSS Text & Marker Overlay Layer (Multilingual Ready) */}
          <div className="mapOverlayLayer">
            {/* West Sea Indicator */}
            <div className="seaLabelWest">{sg.southGlanceSeaWest}</div>
            {/* East Sea Indicator */}
            <div className="seaLabelEast">{sg.southGlanceSeaEast}</div>

            {/* Sunset Town Pin Overlay (Clickable -> /zones/sunset-town) */}
            <Link
              href={localePath(locale, '/zones/sunset-town')}
              className="mapInteractiveItem markerSunset"
              title={sg.southGlanceSunsetCardTitle}
            >
              <div className="markerLabelSunset">
                <strong>{sg.southGlanceSunsetPinTitle}</strong>
                <span>{sg.southGlanceSunsetPinSub}</span>
              </div>
              <div className="markerPinSunset" />
            </Link>

            {/* Kem Beach Pin Overlay (Disabled -> Preparing state) */}
            <div
              className="mapInteractiveItem markerKhem"
              title={sg.southGlanceKhemCardPreparing}
            >
              <div className="markerLabelKhem">
                <strong>
                  {sg.southGlanceKhemPinTitle}{' '}
                  <span className="statusPreparingBadge">
                    {sg.southGlanceStatusPreparing}
                  </span>
                </strong>
                <span>{sg.southGlanceKhemPinSub}</span>
              </div>
              <div className="markerPinKhem" />
            </div>

            {/* Route Distance Badge Overlay */}
            <div className="routeDistanceBadge">
              <span>🚗 {sg.southGlanceRouteDistance}</span>
            </div>
          </div>
        </div>

        <div className="mapFooterNote">
          <div className="noteLeft">
            {sg.southGlanceNoteDistance}
          </div>
          <div className="noteRight">
            <span>{sg.southGlanceNoteUnverified}</span>
          </div>
        </div>
      </div>

      {/* Two Hub Cards */}
      <div className="twoCardsGrid">
        {/* Sunset Town Card */}
        <article className="zoneCard sunset">
          <div className="zoneCardMedia">
            <img
              src="/hero/02_kiss_bridge_aerial_640.webp"
              alt={sg.southGlanceSunsetCardTitle}
              loading="lazy"
              decoding="async"
            />
            <div className="zoneMediaShade" />
            <span className="zoneCardBadge">{sg.southGlanceSunsetCardBadge}</span>
          </div>
          <div className="zoneCardBody">
            <div className="zoneTitleRow">
              <h4>{sg.southGlanceSunsetCardTitle}</h4>
              <span>{sg.southGlanceSunsetCardSub}</span>
            </div>
            <div className="zoneTagLine">{sg.southGlanceSunsetCardTagline}</div>
            <p className="zoneCardDesc">{sg.southGlanceSunsetCardDesc}</p>
            <div className="zoneFeatureChips">
              <span className="zoneChip">{sg.southGlanceSunsetChip1}</span>
              <span className="zoneChip">{sg.southGlanceSunsetChip2}</span>
              <span className="zoneChip">{sg.southGlanceSunsetChip3}</span>
              <span className="zoneChip">{sg.southGlanceSunsetChip4}</span>
            </div>
            <Link
              href={localePath(locale, '/zones/sunset-town')}
              className="zoneCtaBtn"
            >
              <span>{sg.southGlanceSunsetCta}</span>
              <span>→</span>
            </Link>
          </div>
        </article>

        {/* Kem Beach Card (Preparing State) */}
        <article className="zoneCard khem">
          <div className="zoneCardMedia">
            <img
              src="/zones/khem-beach-hero.webp"
              alt={sg.southGlanceKhemCardTitle}
              loading="lazy"
              decoding="async"
            />
            <div className="zoneMediaShade" />
            <span className="zoneCardBadge">{sg.southGlanceKhemCardBadge}</span>
            <span className="zonePreparingBadge">{sg.southGlanceKhemCardPreparing}</span>
          </div>
          <div className="zoneCardBody">
            <div className="zoneTitleRow">
              <h4>{sg.southGlanceKhemCardTitle}</h4>
              <span>{sg.southGlanceKhemCardSub}</span>
            </div>
            <div className="zoneTagLine">{sg.southGlanceKhemCardTagline}</div>
            <p className="zoneCardDesc">{sg.southGlanceKhemCardDesc}</p>
            <div className="zoneFeatureChips">
              <span className="zoneChip">{sg.southGlanceKhemChip1}</span>
              <span className="zoneChip">{sg.southGlanceKhemChip2}</span>
              <span className="zoneChip">{sg.southGlanceKhemChip3}</span>
            </div>
            <div
              className="zoneCtaBtn disabled"
              title={sg.southGlanceKhemCtaDisabled}
            >
              <span>{sg.southGlanceKhemCtaDisabled}</span>
              <span>🔒</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

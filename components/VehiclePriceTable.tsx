import type { Locale } from '@/lib/i18n/config'
import {
  VEHICLE_FARES,
  VEHICLE_ROUND_TRIP_KEYS,
  formatVnd,
  type VehicleFareTable,
  type VehicleRouteKey,
} from '@/lib/vehiclePricing'
import { getVehiclePricingCopy } from '@/lib/vehiclePricingCopy'

interface VehiclePriceTableProps {
  locale: Locale
  /** airport: 공항 노선만 / other: 공항 노선 제외(이동·차량 투어) / all: 전체 */
  variant?: 'airport' | 'other' | 'all'
  title?: string
  subtitle?: string
  eyebrow?: string
}

const AIRPORT_KEYS: VehicleRouteKey[] = [
  'airportToSouth',
  'southToAirport',
  'airportToNorth',
  'northToAirport',
]

function filterFares(
  fares: Partial<Record<VehicleRouteKey, number>>,
  variant: 'airport' | 'other' | 'all',
) {
  if (variant === 'all') return fares
  const out: Partial<Record<VehicleRouteKey, number>> = {}
  for (const k of Object.keys(fares) as VehicleRouteKey[]) {
    const isAirport = AIRPORT_KEYS.includes(k)
    if ((variant === 'airport') === isAirport) out[k] = fares[k]
  }
  return out
}

function FareRows({
  fares,
  labels,
}: {
  fares: Partial<Record<VehicleRouteKey, number>>
  labels: Record<VehicleRouteKey, string>
}) {
  return (
    <>
      {(Object.keys(fares) as VehicleRouteKey[]).map((key) => (
        <tr key={key}>
          <td>{labels[key]}</td>
          <td className="vehicleFareValue">{formatVnd(fares[key] as number)}</td>
        </tr>
      ))}
    </>
  )
}

function SeatBlock({
  table,
  locale,
  variant,
}: {
  table: VehicleFareTable
  locale: Locale
  variant: 'airport' | 'other' | 'all'
}) {
  const copy = getVehiclePricingCopy(locale)
  return (
    <article className="vehicleFareCard">
      <h3 className="vehicleFareSeats">{copy.seatsLabel(table.seats)}</h3>
      {[
        { title: copy.southTitle, fares: table.south },
        { title: copy.northTitle, fares: table.north },
      ]
        .map((a) => ({ ...a, fares: filterFares(a.fares, variant) }))
        .filter((a) => Object.keys(a.fares).length > 0)
        .map((area) => (
        <div className="vehicleFareArea" key={area.title}>
          <h4 className="vehicleFareAreaTitle">{area.title}</h4>
          <table className="vehicleFareTable">
            <thead>
              <tr>
                <th scope="col">{copy.routeHeader}</th>
                <th scope="col" className="vehicleFareValue">{copy.priceHeader}</th>
              </tr>
            </thead>
            <tbody>
              <FareRows fares={area.fares} labels={copy.routes} />
            </tbody>
          </table>
        </div>
      ))}
    </article>
  )
}

export function VehiclePriceTable({
  locale,
  variant = 'all',
  title,
  subtitle,
  eyebrow,
}: VehiclePriceTableProps) {
  const copy = getVehiclePricingCopy(locale)
  const overtime = VEHICLE_FARES[0].overtimePerHourVnd
  const hasRoundTrip =
    variant !== 'airport' &&
    VEHICLE_FARES.some((t) =>
      VEHICLE_ROUND_TRIP_KEYS.some((k) => t.south[k] !== undefined || t.north[k] !== undefined)
    )
  return (
    <section className="vehiclePriceSection" id={variant === 'airport' ? 'airport-rates' : 'vehicle-rates'}>
      <div className="tourSectionHeader">
        <div className="tourSectionEyebrow">{eyebrow ?? copy.eyebrow}</div>
        <h2 className="tourSectionTitle">{title ?? copy.title}</h2>
        <p className="vehicleFareSubtitle">{subtitle ?? copy.subtitle}</p>
      </div>
      <div className="vehicleFareGrid">
        {VEHICLE_FARES.map((table) => (
          <SeatBlock key={table.seats} table={table} locale={locale} variant={variant} />
        ))}
      </div>
      <ul className="vehicleFareNotes">
        {variant !== 'airport' && <li>{copy.tourIncludes}</li>}
        {hasRoundTrip && <li>{copy.roundTripNote}</li>}
        {variant !== 'airport' && <li>{copy.overtimeNote(formatVnd(overtime))}</li>}
        <li>{copy.extraNote}</li>
      </ul>
    </section>
  )
}

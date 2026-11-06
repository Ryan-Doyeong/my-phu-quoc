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

function SeatBlock({ table, locale }: { table: VehicleFareTable; locale: Locale }) {
  const copy = getVehiclePricingCopy(locale)
  return (
    <article className="vehicleFareCard">
      <h3 className="vehicleFareSeats">{copy.seatsLabel(table.seats)}</h3>
      {[
        { title: copy.southTitle, fares: table.south },
        { title: copy.northTitle, fares: table.north },
      ].map((area) => (
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

export function VehiclePriceTable({ locale }: VehiclePriceTableProps) {
  const copy = getVehiclePricingCopy(locale)
  const overtime = VEHICLE_FARES[0].overtimePerHourVnd
  const hasRoundTrip = VEHICLE_FARES.some((t) =>
    VEHICLE_ROUND_TRIP_KEYS.some((k) => t.south[k] !== undefined || t.north[k] !== undefined)
  )
  return (
    <section className="vehiclePriceSection" id="vehicle-rates">
      <div className="tourSectionHeader">
        <div className="tourSectionEyebrow">{copy.eyebrow}</div>
        <h2 className="tourSectionTitle">{copy.title}</h2>
        <p className="vehicleFareSubtitle">{copy.subtitle}</p>
      </div>
      <div className="vehicleFareGrid">
        {VEHICLE_FARES.map((table) => (
          <SeatBlock key={table.seats} table={table} locale={locale} />
        ))}
      </div>
      <ul className="vehicleFareNotes">
        <li>{copy.tourIncludes}</li>
        {hasRoundTrip && <li>{copy.roundTripNote}</li>}
        <li>{copy.overtimeNote(formatVnd(overtime))}</li>
        <li>{copy.extraNote}</li>
      </ul>
    </section>
  )
}

import React from "react";
import {
  startOfDay,
  addDays,
  endOfDay,
  eachDayOfInterval,
  isSameDay,
  format,
} from "date-fns/esm";
import { Shipment } from "../../../../data/Shipment";
import { isWithinInterval } from "date-fns";
import { useArrivingShipmentsStyles } from "./hooks/useArrivingShipmentsStyles";

export interface ArrivingShipmentProps {
  shipments?: Shipment[];
}

const DAYS_IN_RANGE = 7;

export const ArrivingShipments = ({
  shipments = [],
}: ArrivingShipmentProps): JSX.Element => {
  const { classes } = useArrivingShipmentsStyles();

  const today = new Date();
  const startOfDateRange = startOfDay(today);
  const endOfDateRange = endOfDay(
    addDays(new Date(startOfDateRange), DAYS_IN_RANGE)
  );

  // create an array of the shipments arriving in the next seven days
  const curatedShipments = shipments.filter((shipment: Shipment) => {
    const isWithinRange = isWithinInterval(
      new Date(shipment.estimatedArrival),
      {
        start: startOfDateRange,
        end: endOfDateRange,
      }
    );

    // if the estimated arrival date is not within range, do not include the shipment
    if (!isWithinRange) {
      return false;
    }

    // if the shipment has already arrived, do not include shipment
    // CODE_CHALLENGE: i'd lean towards creating constants for the shipment statuses, given time constrains i've used a string
    if (shipment.status === "ARRIVED") {
      return false;
    }

    return true;
  });

  const datesToRender = eachDayOfInterval({
    start: startOfDateRange,
    end: endOfDateRange,
  });

  const getShipmentsArrivalsForDate = (arrivalDate: Date) =>
    curatedShipments.filter((curatedShipment) =>
      isSameDay(arrivalDate, new Date(curatedShipment.estimatedArrival))
    );

  return (
    <div className={classes.container}>
      <h3>Shipments Arriving In the Next {DAYS_IN_RANGE} Days</h3>
      {shipments.length ? (
        <div className={classes.daysContainer}>
          {datesToRender.map((dateToRender) => {
            // CODE_CHALLENGE: given time I'd probably extract the elements below into a <ShipmentInfo /> component (or something of that nature) to avoid all of the nested conditionals and render logic
            return (
              <div
                key={format(dateToRender, "yyyymmdd")}
                className={classes.dayContainer}
              >
                <div>
                  {isSameDay(today, dateToRender)
                    ? "Today"
                    : format(dateToRender, "E (M/d)")}
                </div>
                <div>
                  {getShipmentsArrivalsForDate(dateToRender).length ? (
                    <div>
                      {getShipmentsArrivalsForDate(dateToRender).map(
                        (shipment) => (
                          <div key={shipment.id}>
                            &nbsp; &nbsp; HBN: {shipment.houseBillNumber}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className={classes.noShipmentContainer}>
                      <span>&nbsp; &nbsp; No Shipments</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Shipments Arriving Within the Next {DAYS_IN_RANGE} days.</p>
      )}
    </div>
  );
};

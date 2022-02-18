import React from "react";
import { Shipment } from "../../../../../../data/Shipment";
import { useShipmentArrivalSummaryStyles } from "./hooks/useShipmentArrivalSummaryStyles";

export interface ShipmentArrivalSummaryProps {
  shipment: Shipment;
}

export const ShipmentArrivalSummary = ({
  shipment,
}: ShipmentArrivalSummaryProps) => {
  const { classes } = useShipmentArrivalSummaryStyles();

  return (
    <div key={shipment.id} className={classes.container}>
      <div className={classes.header}>HBN: {shipment.houseBillNumber}</div>
      <div className={classes.dataGroup}>
        <div className={classes.label}>Client</div>
        <div className={classes.value}>{shipment.client}</div>
      </div>
      <div className={classes.dataGroup}>
        <div className={classes.label}>Status:</div>
        <div className={classes.value}>{shipment.status}</div>
      </div>
    </div>
  );
};

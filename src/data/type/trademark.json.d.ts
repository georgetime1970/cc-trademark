export type ITrademarkList = ITrademark[];

export interface ITrademark {
  id: string;
  name: string;
  src: string;
  kind: number;
  kindName: string;
  registrationNumber: string;
  price: string;
  NumberOfPeople: string;
  dedicatedPeriod: DedicatedPeriod;
  effectiveGroup: string[];
  services: Service[];
  tags: Tags;
}

export interface DedicatedPeriod {
  start: string;
  end: string;
}

export interface Service {
  group: string;
  items: string[];
}

export interface Tags {
  isRare: boolean;
  isHot: boolean;
  isSell: boolean;
}

export type Root = Root2[];

export interface Root2 {
  id: string;
  name: string;
  src: string;
  kind: number;
  kindName: string;
  registrationNumber: string;
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
  IsHot: boolean;
  isSell: boolean;
}

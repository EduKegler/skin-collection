export type IChampion = {
  id: string;
  name: string;
};

export type ISkin = IChampion & {
  id: string;
  num: number;
  name: string;
  isCollected: boolean;
};

export type IChampionDetail = IChampion & {
  skins: ISkin[];
};

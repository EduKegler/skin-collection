export type IChampionBase = {
  id: string;
  name: string;
};

export type ISkin = {
  id: string;
  num: number;
  name: string;
  isCollected: boolean;
  info?: IInfoSkin;
  rating: IRating;
};

export type IRating = {
  rating: string;
  amountReviews: number;
};

export type ISkinTier =
  | "Transcendent"
  | "Ultimate"
  | "Mythic"
  | "Legendary"
  | "Epic"
  | "Standard"
  | "Budget"
  | "Timeworn"
  | "Default"
  | "None";

export type ISkinSet =
  | "Academy"
  | "Albion"
  | "Anima Squad"
  | "Arcade: Heroes"
  | "Arcana"
  | "Bewitching"
  | "Bilgewater: Burning Tides"
  | "Blackfrost"
  | "Blood Moon"
  | "Budget"
  | "Cafe Cuties"
  | "Challenger"
  | "Chronicle"
  | "Collector's Edition"
  | "Conqueror"
  | "Cosmic"
  | "Coven"
  | "Crime City Nightmare"
  | "Crystal Rose"
  | "Crystalis Motus"
  | "Culinary Masters"
  | "Cyber Pop"
  | "Day Job"
  | "Death Sworn"
  | "Default"
  | "Dragonmancers"
  | "Eclipse"
  | "Elderwood"
  | "Empyrean"
  | "Freljord"
  | "Fright Night"
  | "Galatic"
  | "Goth"
  | "Headhunter"
  | "Hearthbreakers"
  | "Heartsteel"
  | "Heartthrobs and Heartaches"
  | "Hextech"
  | "High Noon"
  | "Infernal"
  | "Inkshadow"
  | "Justificar"
  | "K/DA"
  | "Legacy"
  | "Lunar Beast"
  | "Lunar Revel: Firecracker"
  | "Lunar Revel: Warring Kingdoms"
  | "Lunar Revel"
  | "Mad Scientists"
  | "Marauder"
  | "Mecha"
  | "Medieval"
  | "Nightbringer and  Dawnbringer"
  | "Nightbringer and Dawnbringer"
  | "Ocean Song"
  | "Odyssey"
  | "Papercraft"
  | "Pharaoh"
  | "Phoenixmancers"
  | "Popstar"
  | "Porcelain"
  | "Prehistoric Hunters"
  | "Project"
  | "Rift Hospital"
  | "Risen Legends"
  | "Risen Legends"
  | "Snow Moon"
  | "Snowdown Showdown"
  | "Soccer Cup"
  | "Spirit Blossom"
  | "Star Guardian Season 2"
  | "Star Guardian Season 4"
  | "Storybook"
  | "Super Galaxy"
  | "Surprise Party"
  | "Three Honors"
  | "Toy Box"
  | "Trick-or-Treat"
  | "True Damage"
  | "Victorious"
  | "Victorious"
  | "Winter Sports"
  | "Winter Wonder"
  | "Winterblessed"
  | "Woad"
  | "Wonders of the World"
  | "World Champions: 2015 (SKT T1)"
  | "World Champions: 2022 (DRX)"
  | "World Champions: 2022 (EDG)"
  | "World Championship";

export type IInfoSkin = {
  champion: string;
  tier: ISkinTier;
  isLegacy: boolean;
  set: ISkinSet;
};

export type IChampion = IChampionBase & {
  skins: ISkin[];
};

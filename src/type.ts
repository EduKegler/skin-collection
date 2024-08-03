export type IChampionAPI = IChampionBase & {
  skins: Record<string, ISkin>;
};

export type IChampion = IChampionBase & {
  skins: ISkin[];
};

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

export type IInfoSkin = {
  tier: ISkinTier;
  isLegacy: boolean;
  set: ISkinSet;
};

export type IRating = {
  rating: number;
  amountReviews: number;
};

export type ICollectFilter = "All" | "Collect" | "Uncollect";
export type ILegacyFilter = "All" | "OnlyLegacy" | "OnlyNonLegacy";
export type IOrderBy = "ReleaseDate" | "Rarity" | "Reviews" | "Rating";
export type ISkinFilter = "All" | ISkinTier;

export type IReviewDetail = {
  userId: string;
  rating: number;
  comment?: string;
  isOwner: boolean;
};

export type IReviewGeneral = {
  [skinId: string]: number[];
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
  | "None"
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
  | "World Championship"
  | "Snow Day"
  | "Rift Quest"
  | "Astronaut"
  | "Shan Hai Scrolls"
  | "Arcade: Battle Bosses"
  | "Primordian"
  | "Piltover Customs"
  | "Definitely Not"
  | "Program"
  | "Riot"
  | "Lancer"
  | "Space Groove"
  | "Zenith Games"
  | "Bees!"
  | "Road Warrior"
  | "Silver Age"
  | "Zombies vs Slayers"
  | "Worldbreaker"
  | "Arclight"
  | "Vandal"
  | "Debonair"
  | "Street Demons"
  | "Dragon World"
  | "Luchador"
  | "Crime City"
  | "Sugar Rush"
  | "Pool Party"
  | "Battlecast"
  | "Arcticops"
  | "Cops and Robbers"
  | "Pulsefire"
  | "Battle Academy"
  | "Arcane"
  | "World Champions: 2018 (IG)"
  | "Steel Valkyries"
  | "Fables"
  | "Eternum"
  | "High Society"
  | "Dark Star"
  | "Broken Covenant"
  | "Invaders"
  | "Urf The Manatee"
  | "World Champions: 2011 (FNATIC)"
  | "Cats vs Dogs";

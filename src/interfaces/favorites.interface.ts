export interface UserMarkAsFavorite {
  id: number;
  createdAt: string;
  pokemon: Pokemon[];
}

export interface Pokemon {
  id: number;
  createdAt: string;
  createdBy: any;
  updatedBy: any;
  name: string;
  type1: string;
  type2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  generation: number;
  legendary: string;
  image: string;
  ytbUrl: string;
}

export interface IOptionGameConfig {
  name: string;
  images: { [key: string]: string };
  isSpinner?: boolean;
}

export interface IOptionGamesConfig {
  EvenOdd: IOptionGameConfig;
  HeadTail: IOptionGameConfig;
  DiceRolling: IOptionGameConfig;
  KingQueen: IOptionGameConfig;
  TomJerry: IOptionGameConfig;
  LuckySpin: IOptionGameConfig;
  RockPaperScissor: IOptionGameConfig;
  NumberSpin: IOptionGameConfig;
  CardFinding: IOptionGameConfig;
  PoolNumber: IOptionGameConfig;
  CardFlip: IOptionGameConfig;
  CardFind: IOptionGameConfig;
  LuckyNumber: IOptionGameConfig;
  // [game: string]: IOptionGameConfig;
}
export const OptionGames: IOptionGamesConfig = {
  EvenOdd: {
    name: "even-odd",
    images: {
      logo: "/assets/option-games/even-odd-logo.png",
      even: "/assets/option-games/even-logo.png",
      odd: "/assets/option-games/odd-logo.png",
      playing: "/assets/option-games/coin-tossing.gif",
    },
  },
  HeadTail: {
    name: "head-tail",
    images: {
      logo: "/assets/option-games/head-tail/logo.png",
      head: "/assets/option-games/head-tail/head.png",
      tail: "/assets/option-games/head-tail/tail.png",
      playing: "/assets/option-games/head-tail/toss.gif",
    },
  },
  DiceRolling: {
    name: "dice-rolling",
    images: {
      logo: "/assets/option-games/dice-rolling/logo.png",
      playing: "/assets/option-games/dice-rolling/dice-rolling.gif",
      one: "/assets/option-games/dice-rolling/one.png",
      two: "/assets/option-games/dice-rolling/two.png",
      three: "/assets/option-games/dice-rolling/three.png",
      four: "/assets/option-games/dice-rolling/four.png",
      five: "/assets/option-games/dice-rolling/five.png",
      six: "/assets/option-games/dice-rolling/six.png",
    },
  },
  KingQueen: {
    name: "king-queen",
    images: {
      logo: "/assets/option-games/king-queen/logo.png",
      playing: "/assets/option-games/king-queen/tossing.gif",
      king: "/assets/option-games/king-queen/king.jpg",
      queen: "/assets/option-games/king-queen/queen.jpeg",
    },
  },
  TomJerry: {
    name: "tom-jerry",
    images: {
      logo: "/assets/option-games/tom-jerry/logo.png",
      playing: "/assets/option-games/tom-jerry/chasing.gif",
      tom: "/assets/option-games/tom-jerry/tom.png",
      jerry: "/assets/option-games/tom-jerry/jerry.png",
    },
  },
  LuckySpin: {
    name: "lucky-spin",
    images: {
      logo: "/assets/option-games/lucky-spin/wheel.png",
      playing: "/assets/option-games/lucky-spin/lucky-spin.gif",
    },
  },
  RockPaperScissor: {
    name: "rock-paper-scissor",
    images: {
      logo: "/assets/option-games/rock-paper-scissor/logo.png",
      playing: "/assets/option-games/rock-paper-scissor/playing.gif",
      rock: "/assets/option-games/rock-paper-scissor/rock.png",
      paper: "/assets/option-games/rock-paper-scissor/paper.png",
      scissor: "/assets/option-games/rock-paper-scissor/scissor.png",
    },
  },
  NumberSpin: {
    name: "number-spin",
    images: {
      logo: "/assets/option-games/number-spin/logo.png",
    },
    isSpinner: true,
  },
  CardFinding: {
    name: "card-finding",
    images: {
      logo: "/assets/option-games/card-finding/logo.jpg",
      playing: "/assets/option-games/king-queen/tossing2.gif",
      a_red: "/assets/option-games/card-finding/a_red.png",
      a_black: "/assets/option-games/card-finding/a_black.png",
    },
  },
  PoolNumber: {
    name: "pool-number",
    images: {
      logo: "/assets/option-games/pool-number/logo.png",
      playing: "/assets/option-games/pool-number/playing.gif",
      one: "/assets/option-games/pool-number/one.png",
      two: "/assets/option-games/pool-number/two.png",
      three: "/assets/option-games/pool-number/three.png",
      four: "/assets/option-games/pool-number/four.png",
      five: "/assets/option-games/pool-number/five.png",
      six: "/assets/option-games/pool-number/six.png",
      seven: "/assets/option-games/pool-number/seven.png",
      eight: "/assets/option-games/pool-number/eight.png",
    },
  },
  CardFlip: {
    name: "card-flip",
    images: {
      logo: "/assets/option-games/card-flip/logo.jpg",
      playing: "/assets/option-games/king-queen/tossing2.gif",
      hidden: "/assets/option-games/hidden.png",
      a: "/assets/option-games/card-flip/a.png",
      q: "/assets/option-games/card-flip/q.png",
      8: "/assets/option-games/card-flip/8.png",
      10: "/assets/option-games/card-flip/10.png",
    },
  },
  CardFind: {
    name: "card-find",
    images: {
      logo: "/assets/option-games/card-flip/logo.jpg",
      playing: "/assets/option-games/king-queen/tossing2.gif",
      hidden: "/assets/option-games/hidden.png",
      a: "/assets/option-games/card-flip/a.png",
      q: "/assets/option-games/card-flip/q.png",
      8: "/assets/option-games/card-flip/8.png",
      10: "/assets/option-games/card-flip/10.png",
    },
  },
  LuckyNumber: {
    name: "lucky-number",
    images: {
      logo: "/assets/option-games/lucky-number/logo.png",
      playing: "/assets/option-games/lucky-number/playing.gif",
      hidden: "/assets/option-games/hidden.png",
      1: "/assets/option-games/lucky-number/1.png",
      2: "/assets/option-games/lucky-number/2.png",
      3: "/assets/option-games/lucky-number/3.png",
      blank: "/assets/option-games/lucky-number/blank.png",
    },
  },
};

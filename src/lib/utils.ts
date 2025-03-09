import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate random positions for objects
const generateRandomPositions = (
  count: number,
  minDistance: number,
  runwayWidth: number,
  groundSize: number,
  existingPositions: [number, number, number][] = [],
  objectSize: number = 1
) => {
  const positions: [number, number, number][] = [];
  const runwayHalfWidth = runwayWidth / 2 + minDistance;

  for (let i = 0; i < count; i++) {
    let x: number = 0;
    let z: number = 0;
    let tooClose = true;

    // Try to find a position that's not too close to existing objects or the runway
    let attempts = 0;
    while (tooClose && attempts < 100) {
      // Random position within ground bounds
      x = (Math.random() - 0.5) * groundSize;
      z = (Math.random() - 0.5) * groundSize;

      // Check if too close to runway
      if (Math.abs(x) < runwayHalfWidth && Math.abs(z) < 250) {
        attempts++;
        continue;
      }

      // Check if too close to existing objects
      tooClose = [...existingPositions, ...positions].some((pos) => {
        const dx = pos[0] - x;
        const dz = pos[2] - z;
        // Use larger minimum distance for bigger objects
        const minDist = minDistance + objectSize;
        return Math.sqrt(dx * dx + dz * dz) < minDist;
      });

      attempts++;
    }

    if (!tooClose) {
      // Position y at -0.5 to align with ground level (ground is at -0.5)
      positions.push([x, -0.5, z]);
    }
  }

  return positions;
};

// Generate random positions for different types of trees
export const handleAllPositions = () => {
  const allPositions: [number, number, number][] = [];

  const limeTreePositions = generateRandomPositions(20, 20, 20, 900);
  allPositions.push(...limeTreePositions);

  const beechTreePositions = generateRandomPositions(
    20,
    25,
    20,
    900,
    allPositions
  );
  allPositions.push(...beechTreePositions);

  const palmTreePositions = generateRandomPositions(
    20,
    30,
    20,
    900,
    allPositions
  );
  allPositions.push(...palmTreePositions);

  const spruceTreePositions = generateRandomPositions(
    20,
    25,
    20,
    900,
    allPositions
  );
  allPositions.push(...spruceTreePositions);

  // Generate positions for buildings with larger minimum distances
  // Houses
  const house1Positions = generateRandomPositions(
    15,
    40,
    30,
    900,
    allPositions,
    10
  );
  allPositions.push(...house1Positions);

  const house2Positions = generateRandomPositions(
    15,
    40,
    30,
    900,
    allPositions,
    10
  );
  allPositions.push(...house2Positions);

  const house3Positions = generateRandomPositions(
    15,
    40,
    30,
    900,
    allPositions,
    10
  );
  allPositions.push(...house3Positions);

  const house4Positions = generateRandomPositions(
    15,
    40,
    30,
    900,
    allPositions,
    10
  );
  allPositions.push(...house4Positions);

  const house5Positions = generateRandomPositions(
    15,
    40,
    30,
    900,
    allPositions,
    10
  );
  allPositions.push(...house5Positions);

  // Special buildings
  const barnPositions = generateRandomPositions(
    5,
    60,
    40,
    900,
    allPositions,
    15
  );
  allPositions.push(...barnPositions);

  const libraryPositions = generateRandomPositions(
    5,
    60,
    40,
    900,
    allPositions,
    15
  );
  allPositions.push(...libraryPositions);

  return {
    barnPositions: barnPositions.map((position) => ({
      position,
      type: 'barn',
      scale: 8,
      rotation: 0,
    })),
    beechTreePositions: beechTreePositions.map((position) => ({
      position,
      type: 'beech',
      scale: 1,
    })),
    limeTreePositions: limeTreePositions.map((position) => ({
      position,
      type: 'lime',
      scale: 1,
    })),
    libraryPositions: libraryPositions.map((position) => ({
      position,
      type: 'library',
      scale: 1,
      rotation: 0,
    })),
    palmTreePositions: palmTreePositions.map((position) => ({
      position,
      type: 'palm',
      scale: 1,
    })),
    house1Positions: house1Positions.map((position) => ({
      position,
      type: 'house1',
      scale: 1,
      rotation: 0,
    })),
    house2Positions: house2Positions.map((position) => ({
      position,
      type: 'house2',
      scale: 1,
      rotation: 0,
    })),
    house3Positions: house3Positions.map((position) => ({
      position,
      type: 'house3',
      scale: 1,
      rotation: 0,
    })),
    house4Positions: house4Positions.map((position) => ({
      position,
      type: 'house4',
      scale: 1,
      rotation: 0,
    })),
    house5Positions: house5Positions.map((position) => ({
      position,
      type: 'house5',
      scale: 1,
      rotation: 0,
    })),
    spruceTreePositions: spruceTreePositions.map((position) => ({
      position,
      type: 'spruce',
      scale: 1,
    })),
  };
};

export const fixedPositions: {
  trees: {
    position: [number, number, number];
    type: 'beech' | 'lime' | 'palm' | 'spruce';
    scale: number;
  }[];
  houses: {
    position: [number, number, number];
    rotation: number;
    type:
      | 'house1'
      | 'house2'
      | 'house3'
      | 'house4'
      | 'house5'
      | 'barn'
      | 'library';
    scale: number;
  }[];
  landmarks: {
    position: [number, number, number];
    rotation: number;
    type:
      | 'ferrisWheel'
      | 'windTurbine'
      | 'tower'
      | 'largeRock'
      | 'lampPost'
      | 'rock'
      | 'ruins';
    scale: number;
  }[];
} = {
  trees: [
    {
      position: [331.4416797082276, -0.5, -170.3379676641792],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-140.44335939252775, -0.5, 21.252365147210405],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-233.072280823733, -0.5, 318.6172892379324],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-158.34403835205632, -0.5, -392.0858497744055],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-351.1669954713474, -0.5, -69.8621704041894],
      type: 'beech',
      scale: 1,
    },
    {
      position: [210.58954199240188, -0.5, 32.49907897495285],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-178.32317964248904, -0.5, -54.31540773213257],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-170.1518890938631, -0.5, -128.53280866637277],
      type: 'beech',
      scale: 1,
    },
    {
      position: [85.05827879880512, -0.5, 189.62510954621737],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-109.21157940093606, -0.5, -335.1626200894255],
      type: 'beech',
      scale: 1,
    },
    {
      position: [341.01526320729283, -0.5, 418.83468568283695],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-148.74573546186966, -0.5, -183.77134565187322],
      type: 'beech',
      scale: 1,
    },
    {
      position: [258.5539886525532, -0.5, -324.0717209452906],
      type: 'beech',
      scale: 1,
    },
    {
      position: [275.4483969939269, -0.5, 412.4087437513566],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-391.6126903174342, -0.5, 162.5177582452571],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-232.6464936584852, -0.5, 95.11102810668477],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-125.68381047234787, -0.5, 338.27184882788623],
      type: 'beech',
      scale: 1,
    },
    {
      position: [440.68911430842445, -0.5, 435.8732236266915],
      type: 'beech',
      scale: 1,
    },
    {
      position: [242.19586175809442, -0.5, -36.18020416638781],
      type: 'beech',
      scale: 1,
    },
    {
      position: [-49.61166650656801, -0.5, 418.69636242106094],
      type: 'beech',
      scale: 1,
    },
    {
      position: [34.96109212766212, -0.5, 199.70622774358097],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-19.873206008951392, -0.5, 268.5030760746526],
      type: 'lime',
      scale: 1,
    },
    {
      position: [308.91992378292855, -0.5, 52.37748923828889],
      type: 'lime',
      scale: 1,
    },
    {
      position: [153.04061808708852, -0.5, -328.25206190852106],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-237.12243573823397, -0.5, 375.87360865320824],
      type: 'lime',
      scale: 1,
    },
    {
      position: [283.49683568460586, -0.5, -393.03447611514343],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-294.66995808712824, -0.5, 165.3445144957103],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-246.54031308425056, -0.5, -274.1856361040389],
      type: 'lime',
      scale: 1,
    },
    {
      position: [101.7612494833148, -0.5, -347.58020255834117],
      type: 'lime',
      scale: 1,
    },
    {
      position: [333.3385388886007, -0.5, 183.84584437831444],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-113.15915735111865, -0.5, -91.94939134813876],
      type: 'lime',
      scale: 1,
    },
    {
      position: [310.7303614615126, -0.5, -286.4838936838356],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-142.582623003523, -0.5, 245.71992889154433],
      type: 'lime',
      scale: 1,
    },
    {
      position: [230.46594764960622, -0.5, 264.2336164287089],
      type: 'lime',
      scale: 1,
    },
    {
      position: [165.44998674435018, -0.5, -248.10086155181295],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-416.1585019047355, -0.5, -365.63624885018635],
      type: 'lime',
      scale: 1,
    },
    {
      position: [48.93546334172443, -0.5, -292.2144719102985],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-436.26637784923224, -0.5, 426.51466769656565],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-351.9168862905001, -0.5, -321.17674394189885],
      type: 'lime',
      scale: 1,
    },
    {
      position: [65.95602154340729, -0.5, -393.06875648536646],
      type: 'lime',
      scale: 1,
    },
    {
      position: [-391.32146867187396, -0.5, -437.78136422162197],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [118.46507877164552, -0.5, -224.48218220330045],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [350.62383504377436, -0.5, -106.92296240975053],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-101.25297409990598, -0.5, -118.54061762226054],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [114.07173300655995, -0.5, 343.56620440380027],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-286.46803005560105, -0.5, 130.90879591454058],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-382.9554394826125, -0.5, -246.89352441139565],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-172.51449199170884, -0.5, -97.90695106993472],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-59.0490530116776, -0.5, -269.5471205304313],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-332.19264275864913, -0.5, 54.65119368858209],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [286.8465362378924, -0.5, 69.01771264905227],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [123.46499304879448, -0.5, -370.19139125738303],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-111.44462204866186, -0.5, 107.13439196071151],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-58.479102814939175, -0.5, 28.791681389516775],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-15.01625413755805, -0.5, -343.1790890171117],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [310.4540412838578, -0.5, 198.20626839813823],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-154.51004243949654, -0.5, -276.2548690151399],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [84.13606317951825, -0.5, 317.90093650177164],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-292.6541755259987, -0.5, 342.46145290820886],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-273.3381644120907, -0.5, 100.90855246452173],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [197.20609729708895, -0.5, -210.1906117806838],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-112.77673533393575, -0.5, -11.836652295324557],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [185.3346984808225, -0.5, -140.96771927844804],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [244.19508386942886, -0.5, 50.54688474712896],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [207.84994886966498, -0.5, -256.7987665570701],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-262.16023099872416, -0.5, -227.3140854047097],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-345.85839710928764, -0.5, 231.06849052903578],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [187.88137227183358, -0.5, -352.25736018278855],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [269.27451433338297, -0.5, 104.72516562670617],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [273.4357178852412, -0.5, -185.47763876665263],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-185.2823358511315, -0.5, 438.2003181557286],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-346.6713667408628, -0.5, -410.47948287303745],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-216.90589436304035, -0.5, 64.88855111835798],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [245.8501072848657, -0.5, -379.4467166120259],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [80.19550445903974, -0.5, -277.85253210729115],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [135.8076491788549, -0.5, -74.88514623224889],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [258.32033383926887, -0.5, -231.77358448848523],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [130.79312915301202, -0.5, 111.48247910589888],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-399.8797910865856, -0.5, -17.87843387295458],
      type: 'spruce',
      scale: 1,
    },
    {
      position: [-4.945452691881602, -0.5, 349.16255625810027],
      type: 'spruce',
      scale: 1,
    },
  ],
  houses: [
    {
      position: [-230.6017180532076, -0.5, -408.4601164401116],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-409.9253033363217, -0.5, -181.42158149539492],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [134.44862977774986, -0.5, 57.8205976963567],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [90.16231518269309, -0.5, -125.03660901100602],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-420.2916052561468, -0.5, 249.74656188736907],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [203.52546209234518, -0.5, 91.20198408313634],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [410.4818163236782, -0.5, 194.9380001197929],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-420.7423343962964, -0.5, 344.09639353570844],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-191.1000295104516, -0.5, 271.4825480149014],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-74.61176658067193, -0.5, 169.4077949211466],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-58.34023598201783, -0.5, -432.3212668935238],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [407.5353866031465, -0.5, -340.13946795067613],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-221.7532041033753, -0.5, 7.474854057819869],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-67.52743580236972, -0.5, -380.6759487876605],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-378.8918152964615, -0.5, 306.26593380468637],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [134.82346440368048, -0.5, 288.33118344911475],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-59.19469147604093, -0.5, -65.57132328641295],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [437.0385216728349, -0.5, -264.3508883219454],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-220.51346679189712, -0.5, 231.0023229175043],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [395.4625839851325, -0.5, -135.32952468207105],
      type: 'house1',
      scale: 8,
      rotation: 0,
    },
    {
      position: [140.4649228848303, -0.5, 215.88245592787746],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [429.4475948691999, -0.5, 121.90301609941226],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [419.89606206850453, -0.5, -415.6576002582551],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [311.97380601604937, -0.5, 344.8609461668705],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [405.0843717086995, -0.5, 392.4566306149184],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [431.5106525094962, -0.5, -56.654802452907575],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-57.584070649789766, -0.5, 102.1823011167391],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-413.29232910316887, -0.5, -296.1690371382191],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [192.9062875963431, -0.5, 373.57193871757],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [292.6721936419594, -0.5, -83.17462380554635],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [76.46110828805244, -0.5, 441.21812599068693],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-276.38145851301664, -0.5, -346.2216847957231],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-289.5897919602151, -0.5, 248.5395363120617],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-72.10657134624408, -0.5, 327.4943871210618],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-145.56644523373168, -0.5, 187.61101027438062],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-136.39817644205226, -0.5, -437.68260212256547],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [310.33078559446375, -0.5, 265.8745584786179],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-310.61775272279283, -0.5, 3.0326146692293943],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [79.0946015581191, -0.5, -67.20987531759685],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [2.9814875000003127, -0.5, 412.2038230884676],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [447.782200710082, -0.5, 68.0268928994264],
      type: 'house2',
      scale: 8,
      rotation: 0,
    },
    {
      position: [167.3137841956646, -0.5, 173.26196677897684],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [401.8654980278296, -0.5, 6.972323121818413],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [374.1957610957846, -0.5, 144.4348033401082],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [42.537778889629685, -0.5, 266.5727942269288],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-318.09016445701616, -0.5, -136.3971845567022],
      type: 'house5',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-240.48364461938797, -0.5, -82.42422328997532],
      type: 'house5',
      scale: 8,
      rotation: 0,
    },
    {
      position: [387.06771150396753, -0.5, 73.39574923463155],
      type: 'house5',
      scale: 8,
      rotation: 0,
    },
    {
      position: [259.64635662277465, -0.5, 173.1838638218781],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [328.90324569753074, -0.5, -16.355185902884717],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [235.6682990106162, -0.5, -123.81472525803461],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-102.29747550849349, -0.5, 395.0867473142107],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-415.2367429263425, -0.5, 31.541642983654516],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-380.8933080699041, -0.5, -114.79986598390026],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-228.20317897941808, -0.5, -329.6843694863097],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [169.68854691990992, -0.5, 328.91850648352624],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [378.1472096368666, -0.5, 262.77975477713767],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [188.43814334661587, -0.5, -65.4274683718165],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [426.5611394987005, -0.5, -199.80082793621418],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [141.64560264588667, -0.5, 434.04577887807744],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-306.5981714887294, -0.5, 399.35924862188267],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [417.24090081442284, -0.5, 322.63228973321816],
      type: 'house3',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-366.59131751310935, -0.5, 370.0137689877039],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [340.41341013199207, -0.5, -379.36140842441773],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-212.37070216255748, -0.5, 161.4703862999353],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-449.1953361672218, -0.5, -114.57416400390845],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [377.70441551157114, -0.5, -273.9988857153585],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [342.3485991119594, -0.5, 98.64287311415711],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [83.19995059898542, -0.5, 38.70715790931041],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [271.721375560811, -0.5, 303.1046118981944],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-209.79956846982554, -0.5, -165.9362408743724],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-1.6757233350622291, -0.5, -434.29726093314974],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-445.9567069866591, -0.5, -55.99477551860546],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-4.916511273214796, -0.5, -256.9492891656567],
      type: 'house4',
      scale: 8,
      rotation: 0,
    },
    {
      position: [-326.5752674889252, -0.5, -265.4777224855166],
      type: 'house5',
      scale: 8,
      rotation: 0,
    },
    {
      position: [187.98674267658237, -0.5, -432.7252503953672],
      type: 'barn',
      scale: 8,
      rotation: 0,
    },
  ],
  landmarks: [
    // Ferris Wheel - place it in a prominent location
    {
      position: [150, 0, -300],
      rotation: 0,
      type: 'ferrisWheel',
      scale: 10,
    },
    // Wind Turbines - place them in open areas
    {
      position: [-200, 0, -350],
      rotation: 0,
      type: 'windTurbine',
      scale: 8,
    },
    {
      position: [-250, 0, -300],
      rotation: 0.5,
      type: 'windTurbine',
      scale: 8,
    },
    {
      position: [-300, 0, -350],
      rotation: 1,
      type: 'windTurbine',
      scale: 8,
    },
    // Tower - place it on a hill or prominent location
    {
      position: [300, 0, 300],
      rotation: 0,
      type: 'tower',
      scale: 5,
    },
    // Large Rocks - scatter them around
    {
      position: [100, -0.2, 350],
      rotation: 0,
      type: 'largeRock',
      scale: 3,
    },
    {
      position: [-350, -0.2, 200],
      rotation: 1.5,
      type: 'largeRock',
      scale: 3,
    },
    // Lamp Posts - place them along paths or near buildings
    {
      position: [50, -0.5, 150],
      rotation: 0,
      type: 'lampPost',
      scale: 2,
    },
    {
      position: [50, -0.5, 180],
      rotation: 0,
      type: 'lampPost',
      scale: 2,
    },
    {
      position: [50, -0.5, 210],
      rotation: 0,
      type: 'lampPost',
      scale: 2,
    },
    // Rocks - scatter them around
    {
      position: [200, -0.3, -150],
      rotation: 0,
      type: 'rock',
      scale: 2,
    },
    {
      position: [-150, -0.3, 150],
      rotation: 1,
      type: 'rock',
      scale: 2,
    },
    {
      position: [350, -0.3, -250],
      rotation: 2,
      type: 'rock',
      scale: 2,
    },
    // Ruins - place them in interesting locations
    {
      position: [-100, -0.5, -400],
      rotation: 0,
      type: 'ruins',
      scale: 4,
    },
    {
      position: [400, -0.5, 100],
      rotation: 1,
      type: 'ruins',
      scale: 4,
    },
    // Add more ruins within the ground boundaries
    {
      position: [350, -0.5, 250],
      rotation: 0.5,
      type: 'ruins',
      scale: 4,
    },
  ],
};

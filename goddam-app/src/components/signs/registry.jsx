import {
  TriangleFrame,
  InvertedTriangleFrame,
  DiamondFrame,
  OctagonFrame,
  CircleFrame,
} from './frames.jsx'
import {
  BentArrow,
  DoubleBendArrow,
  SlopeProfile,
  ConvergingLines,
  SkiddingCar,
  BumpProfile,
  GravelSpray,
  RippleRoad,
  RailBarrier,
  RailNoBarrier,
  PedestrianFigure,
  ChildrenFigures,
  WorkerFigure,
  BicycleShape,
  AnimalBlob,
  TrafficLightShape,
  RockfallShape,
  WindsockShape,
  TwoWayArrows,
  Exclamation,
  AirplaneShape,
  SnowflakeShape,
  CrossPriorityArrows,
  IntersectionLines,
  OppositePriorityArrows,
  RoundaboutArrows,
  MergeArrow,
  StopText,
  MiniOctagon,
  MiniInvertedTriangle,
  PalmStopShape,
} from './icons.jsx'

// The sign SVG library. Content (signs.json) references these by name via the
// "svg" field; this registry is the only place that maps a name to pixels.
// Adding a sign never requires touching this file unless it needs a genuinely
// new pictogram — reuse an existing entry whenever the shape already exists.
export const signRegistry = {
  // --- danger (triangle) ---
  SignVirageDroite: () => <TriangleFrame><BentArrow /></TriangleFrame>,
  SignVirageGauche: () => <TriangleFrame><BentArrow mirror /></TriangleFrame>,
  SignViragesSuccessifsDroite: () => <TriangleFrame><DoubleBendArrow /></TriangleFrame>,
  SignViragesSuccessifsGauche: () => <TriangleFrame><DoubleBendArrow mirror /></TriangleFrame>,
  SignDescenteDangereuse: () => <TriangleFrame><SlopeProfile direction="down" percent="12%" /></TriangleFrame>,
  SignMonteeForte: () => <TriangleFrame><SlopeProfile direction="up" percent="12%" /></TriangleFrame>,
  SignChausseeRetrecie: () => <TriangleFrame><ConvergingLines side="both" /></TriangleFrame>,
  SignChausseeRetrecieDroite: () => <TriangleFrame><ConvergingLines side="right" /></TriangleFrame>,
  SignChausseeRetrecieGauche: () => <TriangleFrame><ConvergingLines side="left" /></TriangleFrame>,
  SignChausseeGlissante: () => <TriangleFrame><SkiddingCar /></TriangleFrame>,
  SignCassisDosDane: () => <TriangleFrame><BumpProfile /></TriangleFrame>,
  SignGravillons: () => <TriangleFrame><GravelSpray /></TriangleFrame>,
  SignChausseeDeformee: () => <TriangleFrame><RippleRoad /></TriangleFrame>,
  SignPassageNiveauAvecBarriere: () => <TriangleFrame><RailBarrier /></TriangleFrame>,
  SignPassageNiveauSansBarriere: () => <TriangleFrame><RailNoBarrier /></TriangleFrame>,
  SignPassagePietons: () => <TriangleFrame><PedestrianFigure scale={0.9} x={50} /></TriangleFrame>,
  SignEnfants: () => <TriangleFrame><ChildrenFigures /></TriangleFrame>,
  SignDeboucheCyclistes: () => <TriangleFrame><BicycleShape /></TriangleFrame>,
  SignAnimauxDomestiques: () => <TriangleFrame><AnimalBlob variant="domestic" /></TriangleFrame>,
  SignAnimauxSauvages: () => <TriangleFrame><AnimalBlob variant="wild" /></TriangleFrame>,
  SignTravaux: () => <TriangleFrame><WorkerFigure /></TriangleFrame>,
  SignFeuxTricolores: () => <TriangleFrame><TrafficLightShape /></TriangleFrame>,
  SignChuteDePierres: () => <TriangleFrame><RockfallShape /></TriangleFrame>,
  SignVentLateral: () => <TriangleFrame><WindsockShape /></TriangleFrame>,
  SignCirculationDeuxSens: () => <TriangleFrame><TwoWayArrows /></TriangleFrame>,
  SignAutresDangers: () => <TriangleFrame><Exclamation /></TriangleFrame>,
  SignAeroport: () => <TriangleFrame><AirplaneShape /></TriangleFrame>,
  SignVerglas: () => <TriangleFrame><SnowflakeShape /></TriangleFrame>,

  // --- priorite ---
  SignStop: () => <OctagonFrame><StopText /></OctagonFrame>,
  SignCedezPassage: () => <InvertedTriangleFrame />,
  SignRoutePrioritaire: () => <DiamondFrame />,
  SignFinRoutePrioritaire: () => <DiamondFrame banned />,
  SignIntersectionSansPriorite: () => <TriangleFrame><IntersectionLines /></TriangleFrame>,
  SignAnnonceCedez: () => <TriangleFrame><MiniInvertedTriangle /></TriangleFrame>,
  SignAnnonceStop: () => <TriangleFrame><MiniOctagon /></TriangleFrame>,
  SignPrioriteSensInverse: () => <TriangleFrame><OppositePriorityArrows /></TriangleFrame>,
  SignCedezSensInverse: () => (
    <TriangleFrame>
      <g transform="scale(-1,1) translate(-100,0)">
        <OppositePriorityArrows />
      </g>
    </TriangleFrame>
  ),
  SignRondPoint: () => <TriangleFrame><RoundaboutArrows /></TriangleFrame>,
  SignPrioriteADroite: () => <TriangleFrame><CrossPriorityArrows /></TriangleFrame>,
  SignCarrefourGiratoire: () => <CircleFrame><RoundaboutArrows /></CircleFrame>,
  SignDeboucheRoutePrioritaireGauche: () => <TriangleFrame><MergeArrow mirror /></TriangleFrame>,
  SignDeboucheRoutePrioritaireDroite: () => <TriangleFrame><MergeArrow /></TriangleFrame>,
  SignCedezPietons: () => <InvertedTriangleFrame><PedestrianFigure scale={0.75} x={50} /></InvertedTriangleFrame>,
  SignCedezCyclistes: () => <InvertedTriangleFrame><BicycleShape /></InvertedTriangleFrame>,
  SignArretDouanePolice: () => <CircleFrame><PalmStopShape /></CircleFrame>,
}

export function SignIcon({ svg, className }) {
  const Render = signRegistry[svg]
  if (!Render) {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="sign-svg">
          <rect x="4" y="4" width="92" height="92" rx="10" fill="none" stroke="var(--color-stop)" strokeWidth="4" />
          <text x="50" y="56" fontSize="12" textAnchor="middle" fill="var(--color-stop)">
            ?
          </text>
        </svg>
      </div>
    )
  }
  return <div className={className}><Render /></div>
}

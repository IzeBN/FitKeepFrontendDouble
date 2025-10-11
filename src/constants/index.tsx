import {
  Equipments,
  Inventory,
  Trenazhor,
  Barbells,
  Dumbbells,
} from "../components";

const pageComponents = (
  handleSetActivePage: (page: number) => void,
  equipments: any[]
) => [
    <div className="equipments-page-content">
      <h2 className="main-title">Какое оборудование есть у вас?</h2>
      <Equipments
        handleSetActivePage={handleSetActivePage}
        equipments={equipments}
      />
    </div>,
    <div className="equipments-page-content">
      <h2 className="main-title">Какое оборудование есть у вас?</h2>
      <Inventory />
    </div>,
    <div className="equipments-page-main">
      <h2 className="main-title">Какие тренажеры есть у вас?</h2>
      <Trenazhor />
    </div>,
    <div className="equipments-page-main">
      <Barbells />
    </div>,
    <div className="equipments-page-main">
      <Dumbbells />
    </div>,
  ];

export default pageComponents;

export * from "./dummyData";

export * from "./telegram";
export * from "./links";


import PieChartComponent from "../components/pieChart";
import { useNavigate } from "react-router-dom";
import { categories } from "../constants";
import {
  RightOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  CarOutlined,
  HeartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Navbar } from "../components/navbar";

const icons = [
  <ShoppingCartOutlined />,
  <BookOutlined />,
  <ShoppingOutlined />,
  <HeartOutlined />,
  <CarOutlined />,
  <SmileOutlined />,
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
          <h1 className="text-3xl font-bold font-Roboto absolute top-0 mb-8 w-full py-4 bg-[#f9faf3] text-center text-[#012a57]">
              {" "}
              Centsible{" "}
            </h1>
        <div className="pt-15">
            <PieChartComponent></PieChartComponent>
        </div>
      <div className="flex flex-col bg-[#f9faf3] h-screen">
      <div className="flex flex-col justify-center items-center mb-8">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(`/filter/${category}`)}
              className="flex flex-row justify-between items-center w-[80%] border-slate-400 hover:cursor-pointer"
            >
              {icons[index]}
              <p className="p-3 font-semibold text-slate-700 text-xl w-full">
                {category}
              </p>
              <RightOutlined />
            </div>
          );
        })}
      </div>
      </div>
      <div className="mt=200">
        <Navbar />
      </div>
    </>
  );

};

export default Home;

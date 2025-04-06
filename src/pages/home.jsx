
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
        <div>
            <PieChartComponent></PieChartComponent>
        </div>

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
      <div className="mt=200">
        <Navbar />
      </div>
    </>
  );

};

export default Home;

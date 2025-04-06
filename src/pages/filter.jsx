import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const Filter = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = query(
          collection(db, "transactions"),
          where("user", "==", auth.currentUser.uid),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(res);
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    getData().then((data) => setTransactions(data));
  }, []);

  return (
    <>
    <div className="flex flex-col bg-[#f9faf3]">
      <ArrowLeftOutlined
        onClick={() => navigate("/home")}
        className="hover:cursor-pointer m-6"
      />
    </div>
    <div className="flex flex-col bg-[#f9faf3] min-h-screen">
      <div className="flex flex-col bg-[#f9faf3] justify-center items-center">
        <h1 className="font-bold text-5xl text-slate-700">{category}</h1>
      </div>
      <div className="flex flex-col justify-center w-full items-center mx-auto mt-5 gap-2">
        {transactions.map((doc, index) => {
          return (
            <div
              key={index}
              className="p-2 border-slate-500 rounded-sm border-2 w-[95%]"
            >
              <p className="font-medium text-[22px]">${doc.amount}</p>
              <p className="font-light text-[18px]">{doc.notes}</p>
            </div>
          );
        })}
      </div>
      </div>
      {error && <p className="text-red-900 m-auto">{error}</p>}
    </>
  );
};

export default Filter;

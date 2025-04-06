import React, { useState, useRef } from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import { doc,collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { categories } from "../constants";

const PieChartComponent=() =>{

    const [data,setData]=useState([]);
    const storedUser=JSON.parse(localStorage.getItem("user"));

    if(!storedUser){
        return<div>Please log in first</div>;
    }

    const fetchData=async() =>{
        const userData=[];
        const userID=storedUser.uid;

        for(const c of categories){
            const valRef=doc(db,"users",userID);
            const valSnapshot=await getDoc(valRef);

            if (valSnapshot.exists()){
                const total=valSnapshot.data();
                userData.push({
                    name:c,
                    value:total[c],
                });
            }
        }

        setData(userData);
        console.log("data: ",data);
    };
    
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700", "#8A2BE2", "#FF6347"
      ];

    return (
        <div>
          <button onClick={fetchData}>Fetch Data</button>
          
          {/* Only render PieChart when data is available */}
          {Array.isArray(data) && data.length > 0 && (
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
    );
}

export default PieChartComponent;

    // useEffect(()=>{
    //     const fetchData=async() =>{
    //         const userData=[];

    //         for(const c of categories){
    //             const valRef=doc(db,"users",auth.currentUser.uid,c);
    //             const valSnapshot=await getDoc(valRef);

    //             if (valSnapshot.exists()){
    //                 const total=valSnapshot.data();
    //                 userData.push({
    //                     name:c,
    //                     value:total,
    //                 });
    //             }
    //         }

    //         setData(userData);
    //         console.log("data: ",data);
    //     };

    //     fetchData();


    // }), [auth.currentUser.uid];
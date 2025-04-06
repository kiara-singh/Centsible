import React, { useState, useEffect } from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import { doc,collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { categories } from "../constants";

const PieChartComponent=() =>{

    const [data,setData]=useState([]);
    const[storedUser,setStoredUser]=useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setStoredUser(user);
    }, []);

    
    useEffect(()=>{

        if(!storedUser || isDataFetched){
            return;
        }

        const userData=[];
        const userID=storedUser.uid;

        const fetchData = async () =>{
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
            setIsDataFetched(true)
            console.log("data: ",userData);
        }
        

        fetchData();

        
    }), [storedUser, isDataFetched];
    
    const colors = [
        "#011f4b", "#03396c", "#005b96", "#6497b1", "#b3cde0", "#ce8b54", "#d2a56d"
      ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            {Array.isArray(data) && data.length > 0 && (
              <PieChart width={270} height={270}> 
                <Legend
                  iconSize={10} 
                  layout="horizontal" 
                  align="center" 
                  verticalAlign="top" 
                  wrapperStyle={{
                    fontSize: '12px', 
                    paddingBottom: '10px' 
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"  
                  cy="50%"  
                  outerRadius={80} 
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </div>
    
          <div>
            {/* Additional content below */}
          </div>
        </div>
    );
}

export default PieChartComponent;
  
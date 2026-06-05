'use client'

import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart"

export default function Dashboard() {

  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState(null);

  // useEffect(() => {

  //   async function getData() {
  //     try {
  //       const data = fetch('/api/', {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json'
  //         }          
  //       })
  //     } catch (error) {
  //       setMessage('Error fetching data');
  //     }
  //   }

  //   getData();
  // })

  return (
    <div>
      <LineChart height={400} width={500} series={[{data: [1,2,3,4,5]}]}>

      </LineChart>
    </div>
  )
}
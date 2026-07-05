'use client'

import { useEffect, useState } from "react";
import type { IData } from "@/types/dashboard";
import { LineChart } from "@mui/x-charts/LineChart";
import { EAiProvider } from "@/types/v1";

export default function Dashboard() {

  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<IData[] | null>(null);

  useEffect(() => {

    async function getData() {
      try {
        const res = await fetch('/api/usagedata', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }          
        })

        if (!res.ok) {
          setMessage("Response not ok");
        }
 
        const data = await res.json();
        setData(data.data);
        console.log(data.data); 
      } catch (error) {
        setMessage('Error fetching data');
      }
    }
    getData();
  }, [])

  if (!data) {
    return;
  }

  const getMonthYear = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

  const googleUsage = data?.filter(item => item.ai_provider === EAiProvider.GOOGLE).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));

  const openAIUsage = data?.filter(item => item.ai_provider === EAiProvider.OPEN_AI).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));

  const anthropicUsage = data?.filter(item => item.ai_provider === EAiProvider.ANTHROPIC).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));
  
  const aiUsage = [googleUsage, openAIUsage, anthropicUsage];
  const labels = ["Google", "OpenAI", "Anthropic"];
  const graphColors = ['#4285F4', '#10a37f', '#d97757'];

  const monthConvert = (isoDate: string) => {
    return (new Date(isoDate)).getMonth();
  }

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-start gap-5">
      {data && data.length > 0 &&
        <div className="w-[80%] grid grid-cols-2 grid-rows-1 place-items-center gap-5">
            {(googleUsage && googleUsage.length > 1) && (openAIUsage && openAIUsage.length > 1) && (anthropicUsage && anthropicUsage.length > 1) &&
            <div className="border rounded-md p-5">
              <LineChart
                grid={{ horizontal: true }}
                height={300} 
                width={600} 
                xAxis={[{data: googleUsage.map((x, y) => months[monthConvert(x.created_at)]), scaleType: 'band',label: '2026'}]} 
                yAxis={[{width: 100, min: (Math.min(...googleUsage.map(d => d.token_count)) / 2), max: (Math.max(...googleUsage.map(d => d.token_count)) * 1.4), label: 'TOKENS'}]} 
                series={aiUsage.map((item, index) => { 
                  return {data: item.map(i => i.token_count), label: labels[index], color: graphColors[index], curve: "linear"} 
                })}
              />
            </div>
          } 
          {(data && googleUsage && googleUsage.length > 1) && (openAIUsage && openAIUsage.length > 1) && (anthropicUsage && anthropicUsage.length > 1) &&
            <div className="border rounded-md p-5">
              <LineChart
                grid={{ horizontal: true }}
                height={300} 
                width={600} 
                xAxis={[{data: googleUsage.map((x, y) => months[monthConvert(x.created_at)]), scaleType: 'band',label: '2026'}]} 
                yAxis={[{width: 100, min: (Math.min(...openAIUsage.map(d => d.total_g_co2_emission)) / 2), max: (Math.max(...openAIUsage.map(d => d.total_g_co2_emission)) * 1.5), label: 'g CO2'}]} 
                series={[
                  {data: [...googleUsage.map((d) => d.total_g_co2_emission)], label: "Google", color: '#4285F4', curve: "linear"},
                  {data: [...openAIUsage.map(d => d.total_g_co2_emission)], label: "OpenAI", color: '#10a37f', curve: 'linear'},
                  {data: [...anthropicUsage?.map((d) => d.total_g_co2_emission)], label: "Anthropic", color: '#d97757', curve: 'linear'}
                ]}
              />
            </div>
          } 
        </div>
      }
      <LineChart height={300} 
                width={600}  series={[]} />
    </div>
  )
}
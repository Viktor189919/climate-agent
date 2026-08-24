'use client'

import { useEffect, useState } from "react";
import type { IData } from "@/types/dashboard";
import { LineChart } from "@mui/x-charts/LineChart";
import { EAiProvider } from "@/types/v1";
import { EU_US_AVG_CO2_INTENSITY, AVG_KWH_CHARGE_SMARTPHONE } from "@/types/calculations";
import ApiKeyPopup from "@/components/apiKeyPopup";

export default function Dashboard() {

  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<IData[] | []>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    async function getData() {
      setIsLoading(true);
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

      } catch (error) {
        setMessage('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [])

  async function handleGenerateApiKey() {
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      const { api_key } = await res.json();
      setApiKey(api_key);
    } catch (error) {
      alert("An error occurred while generating the API key. Please try again later.");
    }
  }

  const totalCO2g = data.map((i) => i.total_g_co2_emission).reduce((i, sum) => i + sum, 0)

  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

  const googleUsage = data?.filter(item => item.ai_provider === EAiProvider.GOOGLE).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));

  const openAIUsage = data?.filter(item => item.ai_provider === EAiProvider.OPEN_AI).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));

  const anthropicUsage = data?.filter(item => item.ai_provider === EAiProvider.ANTHROPIC).sort((a, b) => (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime()));

  const aiUsage = [googleUsage, openAIUsage, anthropicUsage];
  const labels = ["Google", "OpenAI", "Anthropic"];
  const graphColors = ['#4285F4', '#10a37f', '#d97757'];

  return (
    <main className="flex flex-col items-center m-10 relative">
      <h1 className="text-3xl font-semibold tracking-[0.2em] text-slate-900 transition mb-8">AI Usage</h1>
      <div className="mb-10 flex flex-col items-center gap-3 rounded-2xl border-3 border-orange-200 px-6 py-5 shadow-sm bg-white">
        {isLoading 
          ? <p className="text-slate-600">Loading...</p>
          : <>
              <h2 className="text-xl font-semibold tracking-wide text-slate-900">Total CO2 emitted</h2>
              <p className="text-3xl font-bold text-orange-300">{Math.round(totalCO2g / 1000)} kg</p>
              <p className="text-sm text-slate-600">Estimated total impact from your AI usage</p>
              { data && data.length > 0 && 
                <p>The same amount emitted as charging <b>{Math.round(totalCO2g / (EU_US_AVG_CO2_INTENSITY * AVG_KWH_CHARGE_SMARTPHONE))}</b> smartphones</p>
              }
            </>
        }

      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition absolute top-4 right-4" onClick={handleGenerateApiKey}>
        Get API key
      </button>
      {message && <p className="text-red-500">{message}</p>}
      {apiKey && 
        <ApiKeyPopup apiKey={apiKey} onClose={() => setApiKey(null)} />
      }
        <div className="grid grid-cols-[max-content_max-content] gap-1 grid-rows-1 place-items-center">
          <div className="shadow-sm border rounded-sm shadow-black bg-gray-200 border-gray-200 p-2">
            <LineChart
              loading={isLoading}
              grid={{ horizontal: true }}
              height={300} 
              width={500} 
              xAxis={[{data: months, scaleType: 'band',label: '2026'}]} 
              yAxis={[{width: 100, min: (Math.min(...googleUsage?.map(d => d.token_count)) / 2), max: (Math.max(...googleUsage?.map(d => d.token_count)) * 1.4), label: 'TOKENS'}]} 
              series={[
                {data: [...googleUsage?.map(d => d.token_count)], label: "Google", color: '#4285F4', curve: "linear"},
                {data: [...openAIUsage?.map(d => d.token_count)], label: "OpenAI", color: '#10a37f', curve: 'linear'},
                {data: [...anthropicUsage?.map(d => d.token_count)], label: "Anthropic", color: '#d97757', curve: 'linear'}
              ]}
            />
          </div>
          <div className="shadow-sm border rounded-sm shadow-black bg-gray-200 border-gray-200 p-2">
            <LineChart
              loading={isLoading}
              grid={{ horizontal: true }}
              height={300} 
              width={500} 
              xAxis={[{data: months, scaleType: 'band',label: '2026'}]} 
              yAxis={[{width: 100, min: (Math.min(...openAIUsage?.map(d => d.total_g_co2_emission)) / 2), max: (Math.max(...openAIUsage?.map(d => d.total_g_co2_emission)) * 1.5), label: 'g CO2'}]} 
              series={[
                {data: [...googleUsage?.map(d => d.total_g_co2_emission)], label: "Google", color: '#4285F4', curve: "linear"},
                {data: [...openAIUsage?.map(d => d.total_g_co2_emission)], label: "OpenAI", color: '#10a37f', curve: 'linear'},
                {data: [...anthropicUsage?.map(d => d.total_g_co2_emission)], label: "Anthropic", color: '#d97757', curve: 'linear'}
              ]}
            />
          </div>
        </div>
      
    </main>
  )
}
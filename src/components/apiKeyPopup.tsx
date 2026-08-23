
interface PopupProps {
  apiKey: string;
  onClose: () => void;
}

export default function ApiKeyPopup({ apiKey, onClose }: PopupProps) {

  return (
    <div className="fixed w-full left-1 inset-0 flex items-center justify-center z-10 bg-black/50">
      <div className="bg-white p-6 border w-fit border-gray-600 rounded-lg shadow-lg flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-4">Your API Key</h2>
        <input className="border-2 rounded-md p-1" value={apiKey} readOnly />
        <p className="mb-4 text-sm text-slate-600">Please copy and store this key securely. You will not be able to view it again.</p>
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
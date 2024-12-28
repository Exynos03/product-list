interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    jsonData: object;
  }
  
  const JsonModal: React.FC<ModalProps> = ({ isOpen, onClose, jsonData }) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => onClose(false)}
      >
        <div
          className="relative bg-white rounded-lg w-11/12 max-w-2xl p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">JSON Viewer</h2>
          <div className="h-96 overflow-y-auto bg-gray-100 p-4 rounded-md">
            <pre className="text-sm text-gray-800">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default JsonModal
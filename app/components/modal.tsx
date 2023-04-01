
const Modal = ({isVisible, onClose, children}:any) => {
    
    if (!isVisible) return null;
    
    const handleClose = (e:any) => {
        e.stopPropagation();
        if(e.target.id === 'modalWrapper') onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" 
            id="modalWrapper"
            onClick={handleClose}>
            <div className="w-[600px] flex flex-col">
                <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded place-self-end"
                    onClick={() => onClose()}>X</button>
                <div className="bg-white rounded-md p-4">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Modal;



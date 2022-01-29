const HandleButton = ({handleSubmit}) => {
  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
      Send Now
    </button>)
}

export default HandleButton;

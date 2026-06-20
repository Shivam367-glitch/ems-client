import { memo } from "react"

const FormError = ({msg}) => { 

  return (
    <small className="text-danger">{msg}</small>
  )
}

export default memo(FormError);
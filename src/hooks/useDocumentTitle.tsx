import { useEffect } from "react"


const useDocumentTitle = (newTitle:string) => {
    useEffect(()=> {
        newTitle? document.title = `WorkDesk | ${newTitle}`: document.title = "WorkDesk"
        return () => {
      document.title = "WorkDesk"; }
    },[newTitle])

}

export default useDocumentTitle

import PageContainer from "@/components/dashboard/page-container"
import PageHeader from "@/components/dashboard/page-header"
import { tools, ToolType } from "@/config/tools"
import { notFound } from "next/navigation"

export default async function ToolPage({params}:{params:Promise<{tool:string}>}) {

    const toolType = (await params).tool as ToolType
    const tool = tools[toolType] 

    if(!tool){
        notFound()
    }

    const ToolComponent = tool.component

  return (
        <PageContainer>
         <PageHeader title={tool.title} description={tool.description} />
         <ToolComponent />
         </PageContainer>
  )
}

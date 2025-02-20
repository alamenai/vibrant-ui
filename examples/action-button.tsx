import { ActionButton } from "@/components/vibrant/action-button"

export const ActionButtonExample = () => {
  const handleDownload = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
  }
  return (
    <ActionButton successText="Downloaded" onClick={handleDownload}>
      Download
    </ActionButton>
  )
}

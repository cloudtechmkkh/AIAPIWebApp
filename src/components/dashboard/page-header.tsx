
type PostHeaderProps = {
    title: string
    description: string
    children?: React.ReactNode
}

export default function PageHeader({title, description, children}:PostHeaderProps) {
  return (
    <div>
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
       {description && <p className="mt-2">{description}</p>}
        </div>
        {children}
    </div>
  )
}

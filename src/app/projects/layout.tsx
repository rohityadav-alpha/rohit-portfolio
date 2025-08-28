interface ProjectsLayoutProps {
  children: React.ReactNode
  modal?: React.ReactNode
}

export default function ProjectsLayout({ 
  children, 
  modal 
}: ProjectsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

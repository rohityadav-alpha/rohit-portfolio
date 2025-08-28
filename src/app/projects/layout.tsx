interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function ProjectsLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

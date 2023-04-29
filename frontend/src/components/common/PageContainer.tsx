type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <div className="w-10/12 2xl:w-8/12 mx-auto">{children}</div>;
}

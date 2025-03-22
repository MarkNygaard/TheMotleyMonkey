type Props = {
  primary: string;
  secondary: string;
  accent: string;
};

const CustomColors = ({ primary, secondary, accent }: Props) => {
  return (
    <head>
      <style>{`
      :root {
        ${primary};
        ${secondary};
        ${accent};
        }
        `}</style>
    </head>
  );
};

export default CustomColors;

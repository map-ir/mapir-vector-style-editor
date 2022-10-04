interface IProps {
  type: string;
}

const SpecEditor = ({ type }: IProps) => {
  switch (type) {
    case 'symbol':
      return <PointEditor />;
    default:
      return null;
  }
};

export default SpecEditor;

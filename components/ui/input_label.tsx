import Text from "../text";

const InputLabel = (props: { value: string }) => {
  return (
    <Text size={12} lineHeight={16} weight={700} color="primary-500">
      {props.value}
    </Text>
  );
};

export default InputLabel;

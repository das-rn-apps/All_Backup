let sharedProps: null;

export const setSharedProps = (props: any) => {
    sharedProps = props;
};

export const getSharedProps = () => {
    return sharedProps;
};

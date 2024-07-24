import React from "react";
import { useFormikContext } from "formik";

import EnterButton from "../Button";

function SubmitButton({ title }) {
	const { handleSubmit } = useFormikContext();

	return <EnterButton title={title} onPress={handleSubmit} />;
}

export default SubmitButton;

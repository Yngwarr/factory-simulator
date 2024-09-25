import { resourceColor } from "../../../../utils";
import type { Resource } from "../../utils";

type Props = { resource: Resource }

export function ResourceWidget({ resource }: Props) {
    const {type, state} = resource;

    return (
        <div className={`${resourceColor(type)}`}>
            <div>{type}</div>
            <div>{state}</div>
        </div>
    );
}

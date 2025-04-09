import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoSelect(props) {
    return (
        <FloatingLabel controlId={props.id} label={props.label} className="mb-3">
            <Form.Select
                value={props.value} required={props.requerido}
                name={props.name} onChange={props.onchange}>
                <option disable="true" value="">({props.msginvalido})</option>
                {props.children}
            </Form.Select>
            <Form.Control.Feedback>{props.msgvalido}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {props.msginvalido}
            </Form.Control.Feedback>
        </FloatingLabel>
    )
}

export default CampoSelect;
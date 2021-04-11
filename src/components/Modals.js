import { Button, Modal } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import ErrorIcon from '@material-ui/icons/Error'

export function DeleteModal({ isOpen, content, onClose }) {
    const handleClose = resp => {
        if (onClose) {
            onClose(resp);
        }
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                className="modal"
            >
                <div className="modal-content">
                    <ErrorIcon fontSize="large" color="error" />
                    <h1>Warning</h1>
                    {
                        content &&
                        <p>{content}</p>
                    }
                    <div>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#90323d', color: 'white' }}
                            onClick={() => { handleClose(true) }}
                        >
                            Delete
                    </Button>
                        <Button
                            variant="contained"
                            style={{ marginLeft: '1em' }}
                            onClick={() => { handleClose(false) }}
                        >
                            Cancel
                    </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
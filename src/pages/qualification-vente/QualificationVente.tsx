import { Box, Container, Step, StepLabel, Stepper } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { FC } from "react";
import FicheSocieteForm from '../../components/forms/fiche-societe-form';
import { FicheSociete } from "../../components/forms/fiche-societe-form/FicheSocieteForm";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { Reducers } from "../../redux/reducers";

const steps = ['Fiche société et ses contacts', '', ''];

const urlApi = process.env.REACT_APP_BACKEND_URL;

const getStepContent = (stepIndex: number, handleClickSave: (type: string, data: FicheSociete | any) => void) => {
    switch (stepIndex) {
        case 0:
            return <FicheSocieteForm mode="ADD" onSave={(data) => handleClickSave('FICHE_SOCIETE', data)} />;
        case 1:
            return 'Page en cours de développement.';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

const QualificationVente: FC = () => {
    const classes = useStyles();

    const logger = useSelector<Reducers>(state => state.logger);

    const [activeStep, setActiveStep] = useState<number>(0);

    const handleClickSave = (type: string, data: FicheSociete | any) => {
        (type === 'FICHE_SOCIETE') && saveCustomer(data);
    }

    const saveCustomer = (data: FicheSociete) => {
        if (data.id) { // update a cutomer

        } else { //  create new Customer
            axios.post(`${urlApi}customer`, data,
                {
                    headers: {
                        'Authorization': `Bearer ${(logger as any)?.token}`
                    }
                }
            ).then(() => {
                if (activeStep > 3) {
                    setActiveStep(prev => prev + 1);
                }
            }).catch(e => {
                alert(e.message);
            });
        }
    }

    return (
        <Container>
            <Box className={classes.root}>
                <Box className={classes.rightNav}>

                </Box>
                <Box className={classes.formContainer}>
                    <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
                        {steps.map((label, key) => (
                            <Step key={key}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box className={classes.formContent}>
                        {getStepContent(activeStep, handleClickSave)}
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default QualificationVente;
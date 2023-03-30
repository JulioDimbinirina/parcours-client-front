import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { FC, useEffect } from "react";
import { useState } from "react";
import { useStyles } from './styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

export interface ContactProfile {
    id: number;
    libelle: string;
}

export interface Contact {
    id?: number;
    civilite?: string;
    nom?: string;
    prenom?: string;
    fonction?: string;
    tel?: string;
    email?: string;
    skype?: string;
    isCopieFacture?: number;
    profilContactIds?: number[];
}


export interface ContactFormProps {
    onSave: (value: Contact) => void;
    value?: Contact;
    contactProfiles: ContactProfile[]
}

const ContactForm: FC<ContactFormProps> = ({ onSave, value, contactProfiles }) => {
    const [constactToSave, setconstactToSave] = useState<Contact | undefined>();
    const [errorInput, setErrorInput] = useState<any>({
        profilContact: false,
        civilite: false,
        prenom: false,
        nom: false,
        tel: false
    });

    useEffect(() => {
        setconstactToSave(value);
    }, [value]);

    const classes = useStyles();

    const handleChangeSelectMultitple = (e: any) => {
        setconstactToSave(prev => ({
            ...prev,
            profilContactIds: e.target.value

        }));
    }

    const handleChange = (e: any) => {
        setconstactToSave(prev => ({
            ...prev,
            [e.target.name]: e.target.value

        }));
    }

    const handleChangePhone = (phone: string) => {
        setconstactToSave(prev => ({
            ...prev,
            tel: phone
        }));
    }

    const handleChangeRadio = (_e: any, value: string) => {
        setconstactToSave(prev => ({ ...prev, isCopieFacture: value === 'non' ? 0 : 1 }))
    }

    const handleSave = () => {
        if (
            constactToSave &&
            constactToSave?.profilContactIds?.length &&
            constactToSave?.civilite?.length &&
            constactToSave?.prenom?.length &&
            constactToSave?.nom?.length &&
            constactToSave?.tel?.length
        ) {
            onSave(constactToSave);
        }
        if (!constactToSave?.profilContactIds?.length) {
            setErrorInput((prev: any) => ({ ...prev, profilContact: true }));
        }
        if (!constactToSave?.civilite?.length) {
            setErrorInput((prev: any) => ({ ...prev, civilite: true }));
        }
        if (!constactToSave?.prenom?.length) {
            setErrorInput((prev: any) => ({ ...prev, prenom: true }));
        }
        if (!constactToSave?.nom?.length) {
            setErrorInput((prev: any) => ({ ...prev, nom: true }));
        }
        if (!constactToSave?.tel?.length) {
            setErrorInput((prev: any) => ({ ...prev, tel: true }));
        }
    }

    return (
        <Box className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="profil-contact">Profil Contact</InputLabel>
                <Select
                    multiple
                    error={errorInput.profilContact}
                    displayEmpty
                    value={constactToSave?.profilContactIds || []}
                    onChange={handleChangeSelectMultitple}
                    renderValue={(selected) => {
                        return <div className={classes.chips}>
                            {(selected as string[] || []).map((value) => (
                                <Chip key={value} label={(contactProfiles || []).find(item => item.id === parseInt(value))?.libelle} className={classes.chip} />
                            ))}
                        </div>
                    }}
                    label="Profil Contact"
                    inputProps={{
                        name: 'profilContact',
                        id: 'profil-contact',
                    }}
                >
                    <MenuItem disabled value="">
                        <em>Profil Contact</em>
                    </MenuItem>
                    {(contactProfiles || []).map((item, key) => (
                        <MenuItem key={key} value={item.id}>
                            {item.libelle}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="civilite">Civilité *</InputLabel>
                <Select
                    native
                    required
                    error={errorInput.civilite}
                    label="Civilité *"
                    value={constactToSave?.civilite}
                    onChange={handleChange}
                    inputProps={{
                        name: 'civilite',
                        id: 'civilite',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value="Madame">Madame</option>
                    <option value="Mademoiselle">Mademoiselle</option>
                    <option value="Monsieur">Monsieur</option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField error={errorInput.prenom} required variant="outlined" label="Prenom" name="prenom" value={constactToSave?.prenom} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField error={errorInput.nom} required variant="outlined" label="Nom" name="nom" value={constactToSave?.nom} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField  variant="outlined" label="Fonction" name="fonction" value={constactToSave?.fonction} onChange={handleChange} />
            </FormControl>
            <PhoneInput
                placeholder="Tél *"
                inputStyle={{ width: '100%', height: 54, borderColor: errorInput.tel ? 'red' : 'none' }}
                enableSearch
                value={constactToSave?.tel}
                onChange={handleChangePhone}
            />
            <FormControl style={{ marginTop: 16 }} className={classes.formControl}>
                <TextField variant="outlined" type="email" label="Email" name="email" value={constactToSave?.email} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant="outlined" label="Skype" name="skype" value={constactToSave?.skype} onChange={handleChange} />
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Copie facture ?</FormLabel>
                <RadioGroup
                    row
                    value={
                        (constactToSave?.isCopieFacture === 0 || constactToSave?.isCopieFacture === 1)
                            ? (constactToSave?.isCopieFacture === 0 ? 'non' : 'oui')
                            : ''
                    }
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="oui" control={<Radio color="primary" />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio color="primary" />} label="Non" />
                </RadioGroup>
            </FormControl>
            <Box display="flex" justifyContent="flex-end">
                <Button color="primary" size="large" variant="contained" onClick={handleSave}>Enregistrer</Button>
            </Box>
        </Box>
    )
}

export default ContactForm;
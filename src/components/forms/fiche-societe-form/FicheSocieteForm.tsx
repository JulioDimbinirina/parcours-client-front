import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useCallback, useState } from "react";
import { FC } from "react";
import { useStyles } from "./styles";
import pays from '../../../constants/countries';
import paysFrCodeJson from '../../../constants/countriesFr';
import { Add, Check, Clear, Delete, Edit } from "@material-ui/icons";
import CustomModal from "../../commons/custom-modal/CustomModal";
import ContactForm, { Contact, ContactProfile } from "../contact-form";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Reducers } from "../../../redux/reducers";

const payFrCode: any = paysFrCodeJson;
const paysFr = pays.map(item => ({ ...item, name: payFrCode[item.code] ? payFrCode[item.code] : item.name }));
export const generateId = () => Math.floor(Math.random() * 100) + Date.now();

const urlApi = process.env.REACT_APP_BACKEND_URL;

//////////// fictif data ///////////
const societes: FicheSociete[] = [
    {
        id: 1,
        raisonSocial: 'TEST',
        marqueCommercial: 'MARQUE',
        contacts: []
    }
];
///////////////////////////////////

export interface FicheSociete {
    id?: number;
    raisonSocial?: string;
    marqueCommercial?: string;
    adresse?: string;
    cp?: string;
    ville?: string;
    siteWeb?: string;
    tel?: string;
    isAdressFactDiff?: number;
    categorieClientId?: number;
    mappingClientId?: number;
    pays?: string;
    userId?: number;
    contacts?: Contact[];
    adresseFacturation?: {
        id?: number;
        cp?: string;
        adresse?: string;
        ville?: string;
        pays?: string;
    }
}

export interface Ref {
    id?: number,
    libelle: string;
}

export interface FicheSocieteFormProps {
    ficheSociete?: FicheSociete;
    mode: 'EDIT' | 'ADD';
    onSave: (data: FicheSociete) => void;
}

interface ErrorForm {
    raisonSociale?: boolean;
    marqueSociale?: boolean;
    mappingClientId?: boolean;
    categorieClientId?: boolean;
}

// Component
const FicheSocieteForm: FC<FicheSocieteFormProps> = ({ ficheSociete, mode = 'ADD', onSave }) => {
    const classes = useStyles();

    const logger = useSelector<Reducers>(store => store.logger);
    // states
    const [ficheSocieteToSave, setFicheSocieteToSave] = useState<FicheSociete>();
    const [dialCode, setDialCode] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [contactToEdit, setContactToEdit] = useState<Contact | undefined>();
    const [showAddressFact, setShowAddressFact] = useState<boolean>(false);
    const [categoriesClient, setCategoriesClient] = useState<Ref[]>([]);
    const [mappingClients, setMappingClients] = useState<Ref[]>([]);
    const [contactprofiles, setContactprofiles] = useState<ContactProfile[]>([]);
    const [formError, setFormError] = useState<ErrorForm>({ raisonSociale: false, marqueSociale: false, mappingClientId: false, categorieClientId: false });

    const handleChangeSelectRaisonSociale = useCallback((_event: any, value: FicheSociete | null) => {
        if (value) {
            setFicheSocieteToSave({ ...ficheSocieteToSave, id: value.id, raisonSocial: value.raisonSocial });
        }
    }, [ficheSocieteToSave]);

    const handleChangeRaisonSocialeTextField = useCallback((event: any) => {
        if (event) {
            setFicheSocieteToSave({ ...ficheSocieteToSave, id: undefined, raisonSocial: event.target.value })
        }
    }, [ficheSocieteToSave]);

    const handleChangeForm = useCallback((event: any) => {
        if (event.target.name === 'isAdressFactDiff' && parseInt(event.target.value) === 1) {
            setShowAddressFact(true);
        } else if (event.target.name === 'isAdressFactDiff' && (parseInt(event.target.value) === 0 || event.target.value === '')) {
            setShowAddressFact(false);
        }
        setFicheSocieteToSave({
            ...ficheSocieteToSave,
            [event.target.name]: event.target.name === 'tel' ? `${dialCode}${event.target.value.replace(dialCode, '')}` : event.target.value
        });
    }, [ficheSocieteToSave, dialCode]);

    const handleChangePays = useCallback((_e: any, option: any) => {
        if (option) {
            let object = { ...ficheSocieteToSave, pays: option.name };
            if (ficheSocieteToSave?.tel?.length) {
                object = { ...object, tel: `${option.dial_code}${object.tel?.replace(dialCode, '')}` }
            }
            setFicheSocieteToSave(object);
            setDialCode(option.dial_code);
        }
    }, [ficheSocieteToSave, dialCode]);

    const handleSave = useCallback(() => {
        if (
            ficheSocieteToSave &&
            ficheSocieteToSave.marqueCommercial &&
            ficheSocieteToSave.raisonSocial && 
            ficheSocieteToSave.categorieClientId &&
            ficheSocieteToSave.mappingClientId
        ) {
            onSave(ficheSocieteToSave);
        }

        if (!ficheSocieteToSave?.raisonSocial) {
            setError('raisonSociale');
        }

        if (!ficheSocieteToSave?.marqueCommercial) {
            setError('marqueSociale');
        }

        if (!ficheSocieteToSave?.categorieClientId) {
            setError('categorieClientId');
        }

        if (!ficheSocieteToSave?.mappingClientId) {
            setError('mappingClientId');
        }

    }, [ficheSocieteToSave, onSave]);

    const setError = (key) => {
        setFormError(prev => ({ ...prev, [key]: true }));
    }

    const handleClickAddContact = () => {
        setOpen(true);
        setContactToEdit(undefined);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSaveContact = useCallback((data: Contact) => {
        if (data.id) {
            const tempContacts = ficheSocieteToSave?.contacts?.map((item) => {
                if (item.id === data.id) {
                    return data;
                }
                return item;
            });
            setFicheSocieteToSave(prev => ({ ...prev, contacts: tempContacts }));
        } else {
            const tempData = { ...data, id: generateId() };
            let contacts = ficheSocieteToSave?.contacts;
            if (!contacts) contacts = [];
            contacts?.push(tempData);
            console.log(contacts);
            setFicheSocieteToSave(prev => ({ ...prev, contacts }))
        }
        setOpen(false);
    }, [ficheSocieteToSave]);

    const handleEditClick = useCallback((id: any) => {
        setContactToEdit(ficheSocieteToSave?.contacts?.find(item => item.id === id));
        setOpen(true);
    }, [ficheSocieteToSave]);

    const handleDeleteClick = useCallback((id: any) => {
        setFicheSocieteToSave({ ...ficheSocieteToSave, contacts: ficheSocieteToSave?.contacts?.filter(item => item.id !== id) })
    }, [ficheSocieteToSave]);

    const handleChangeFormAddrFact = useCallback((e: any) => {
        setFicheSocieteToSave({ ...ficheSocieteToSave, adresseFacturation: { ...ficheSocieteToSave?.adresseFacturation, [e.target.name]: e.target.value } });
    }, [ficheSocieteToSave]);


    const handleChangePaysAddr = useCallback((_e: any, pays: any) => {
        setFicheSocieteToSave({ ...ficheSocieteToSave, adresseFacturation: { ...ficheSocieteToSave?.adresseFacturation, pays: pays?.name } });
    }, [ficheSocieteToSave])

    // get Refs
    useEffect(() => {
        // get categorie
        axios.get(`${urlApi}categorie/client`, {
            headers: {
                'Authorization': `Bearer ${(logger as any)?.token}`,
            },
        }).then(res => {
            Array.isArray(res.data) && setCategoriesClient(res.data);
        }).catch(e => {
            alert(e.message);
        });

        axios.get(`${urlApi}mapping/client`, {
            headers: {
                'Authorization': `Bearer ${(logger as any)?.token}`,
            },
        }).then(res => {
            Array.isArray(res.data) && setMappingClients(res.data);
        }).catch(e => {
            alert(e.message);
        });

        axios.get(`${urlApi}profil/contact`, {
            headers: {
                'Authorization': `Bearer ${(logger as any)?.token}`,
            },
        }).then(res => {
            console.log(res.data);
            Array.isArray(res.data) && setContactprofiles(res.data);
        }).catch(e => {
            alert(e.message);
        });

    }, [logger]);

    return (
        <Box className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12} sm={12} lg={12}>
                    <Typography variant="h3">Fiche Société</Typography>
                </Grid>
                <Grid item md={6} xs={12} sm={12} lg={6}>
                    <FormControl className={classes.formControl}>
                        <Autocomplete
                            id="raisonSocialAutoComplete"
                            options={societes}
                            autoHighlight
                            onChange={handleChangeSelectRaisonSociale}
                            getOptionLabel={(option) => option.id ? option.raisonSocial as string : ''}
                            value={ficheSocieteToSave?.id ? ficheSocieteToSave : null}
                            getOptionSelected={(option, value) => option.id === value.id}
                            renderOption={(option) => (
                                <span>{option.raisonSocial}</span>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Société"
                                    variant="outlined"
                                    error={formError.raisonSociale}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                        <FormHelperText>Si société existante, un choix mettra automatiquement à jour tous les champs et contacts</FormHelperText>
                    </FormControl>
                    {mode === 'ADD' &&
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={formError.raisonSociale}
                                className={classes.TextField}
                                value={ficheSocieteToSave?.id ? '' : ficheSocieteToSave?.raisonSocial}
                                onChange={handleChangeRaisonSocialeTextField} label="Si nouvelle société"
                                variant="outlined"
                            />
                            <FormHelperText classes={{ root: classes.warning }} >Attention la raison sociale renseignée doit correspondre à celle qui sera facturée</FormHelperText>
                        </FormControl>
                    }
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.marqueCommercial}
                            name="marqueCommercial"
                            onChange={handleChangeForm}
                            label="Marque commerciale"
                            variant="outlined"
                            required
                            error={formError.marqueSociale}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="categorieClientId">Catégorie client *</InputLabel>
                        <Select
                            labelId="categorieClientId"
                            id="categorieClientId_id"
                            value={ficheSocieteToSave?.categorieClientId}
                            onChange={handleChangeForm}
                            label="Catégorie client *"
                            name="categorieClientId"
                            native
                            required
                            error={formError.categorieClientId}
                        >
                            <option value=""></option>
                            {(categoriesClient).map((item) => (
                                <option key={item.id} value={item.id}>{item.libelle}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="mappingClientId">Mapping client *</InputLabel>
                        <Select
                            labelId="mappingClientId"
                            id="mappingClientId_id"
                            value={ficheSocieteToSave?.mappingClientId}
                            onChange={handleChangeForm}
                            label="Mapping client *"
                            name="mappingClientId"
                            native
                            required
                            error={formError.mappingClientId}
                        >
                            <option value=""></option>
                            {(mappingClients).map((item) => (
                                <option key={item?.id} value={item?.id}>{item?.libelle}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.adresse}
                            name="adresse"
                            onChange={handleChangeForm}
                            label="Adresse"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6} xs={12} sm={12} lg={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.cp}
                            name="cp"
                            onChange={handleChangeForm}
                            label="Code Postal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.ville}
                            name="ville"
                            onChange={handleChangeForm}
                            label="Ville"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Autocomplete
                            id="country-select-demo"
                            options={paysFr}
                            classes={{
                                option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <>
                                    {option.name}&nbsp;&nbsp;{option.dial_code}
                                </>
                            )}
                            onChange={handleChangePays}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Pays"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.tel}
                            name="tel"
                            onChange={handleChangeForm}
                            label="Tel"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.TextField}
                            value={ficheSocieteToSave?.siteWeb}
                            name="siteWeb"
                            onChange={handleChangeForm}
                            label="site Web"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="isAdressFactDiff">Adresse de facturation différente ?</InputLabel>
                        <Select
                            labelId="isAdressFactDiff"
                            id="mappingClientId_id"
                            value={ficheSocieteToSave?.isAdressFactDiff}
                            onChange={handleChangeForm}
                            label="Adresse de facturation différente ?"
                            name="isAdressFactDiff"
                            native
                        >
                            <option value=""></option>
                            <option value="1">Oui</option>
                            <option value="0">Non</option>
                        </Select>
                    </FormControl>
                </Grid>
                {showAddressFact &&
                    <>
                        <Grid item md={12} xs={12} lg={12} sm={12}>
                            <Typography variant="h6">Adresse de facturation</Typography>
                        </Grid>
                        <Grid item md={6} xs={12} lg={6} sm={12}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    className={classes.TextField}
                                    value={ficheSocieteToSave?.adresseFacturation?.adresse}
                                    name="adresse"
                                    onChange={handleChangeFormAddrFact}
                                    label="Adresse"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    className={classes.TextField}
                                    value={ficheSocieteToSave?.adresseFacturation?.cp}
                                    name="cp"
                                    onChange={handleChangeFormAddrFact}
                                    label="Code Postal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    className={classes.TextField}
                                    value={ficheSocieteToSave?.adresseFacturation?.ville}
                                    name="ville"
                                    onChange={handleChangeFormAddrFact}
                                    label="Ville"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Autocomplete
                                    id="country-select-demo"
                                    options={paysFr}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(option) => (
                                        <>
                                            {option.name}
                                        </>
                                    )}
                                    onChange={handleChangePaysAddr}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Pays"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </>
                }
                <Grid item md={12} xs={12} lg={12} sm={12}>
                    <Box className={classes.titleContactsContainer}>
                        <Typography variant="h3">Ses Contacts</Typography>
                        <Button startIcon={<Add />} color="primary" variant="outlined" onClick={handleClickAddContact}>Ajouter un contact</Button>
                    </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={12} sm={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prénom et Nom</TableCell>
                                    <TableCell>Profil contact</TableCell>
                                    <TableCell>Fonction</TableCell>
                                    <TableCell>Tél</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Skype</TableCell>
                                    <TableCell>Copie Facture</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(ficheSocieteToSave?.contacts || []).map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.prenom} {item.nom}</TableCell>
                                        <TableCell>
                                            {
                                                (item.profilContactIds || []).map(idContactprofile => {
                                                    return contactprofiles.find(item => item.id === idContactprofile)?.libelle
                                                }).join('-')
                                            }
                                        </TableCell>
                                        <TableCell>{item.fonction}</TableCell>
                                        <TableCell>+{item.tel}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.skype}</TableCell>
                                        <TableCell>
                                            {
                                                item.isCopieFacture === 1 || item.isCopieFacture === 0
                                                    ? (item.isCopieFacture === 1 ? <Typography style={{ color: '#1efa5c' }}><Check /></Typography> : <Clear color="error" />)
                                                    : ''
                                            }</TableCell>
                                        <TableCell>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography title="Modifier ce contact" className={classes.actionBtn} onClick={() => handleEditClick(item.id)}>
                                                    <Edit />
                                                </Typography>
                                                <Typography title="Suprimer ce contact" className={classes.actionBtn} onClick={() => handleDeleteClick(item.id)}>
                                                    <Delete />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Box marginTop={4} display="flex" justifyContent="flex-end">
                <Button color="primary" size="large" variant="contained" onClick={handleSave}>Enregistrer</Button>
            </Box>
            <CustomModal title="Ajouter un contact" onClose={handleClose} open={open} >
                <ContactForm onSave={handleSaveContact} contactProfiles={contactprofiles} value={contactToEdit} />
            </CustomModal>
        </Box>
    )
}

export default FicheSocieteForm;
import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import UserContext from '../UserContext';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [view, setView] = useState('');
    const [newWorkout, setNewWorkout] = useState({ name: '', duration: '', status: 'Active' });
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [workoutId, setWorkoutId] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    const [workoutStatus, setWorkoutStatus] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
        }
    }, []);

    useEffect(() => {
        if (!user?.token) {
        getWorkouts();
        }
    }, [user]);

    useEffect(() => {
        if (view !== 'completeWorkoutStatus') {
            setWorkoutId('');
        }
    }, [view]);

    const getWorkouts = async () => {
        if (!user || !user.token) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setWorkouts(data.workouts);
            } else {
                toast.error('Unable to fetch workouts');
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
            toast.error('Unable to fetch workouts');
        }
        setLoading(false);
    };

    const refreshPage = () => {
        getWorkouts();
        setView('getWorkouts');
    };

    const addWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(newWorkout),
            });
            if (response.ok) {
                toast.success('Workout added successfully');
                setNewWorkout({ name: '', duration: '', status: 'Active' });
                refreshPage();
            } else {
                const data = await response.json();
                toast.error(data.message || 'Unable to add workout');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            toast.error('Unable to add workout');
        }
    };

    const updateWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workoutId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ name: workoutName, duration: workoutDuration, status: workoutStatus }),
            });
            if (response.ok) {
                toast.success('Workout updated successfully');
                refreshPage();
            } else {
                const data = await response.json();
                toast.error(data.message || 'Unable to update workout');
            }
        } catch (error) {
            console.error('Error updating workout:', error);
            toast.error('Unable to update workout');
        }
    };

    const deleteWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workoutId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                toast.success('Workout deleted successfully');
                refreshPage();
            } else {
                toast.error('Unable to delete workout');
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
            toast.error('Unable to delete workout');
        }
    };

    const completeWorkoutStatus = async (workoutId) => {
        console.log("Function triggered with Workout ID:", workoutId);
        console.log("Workout ID:", workoutId);
        console.log("Token:", user?.token);
        if (!workoutId) {
            toast.error('Please enter a Workout ID');
            return;
        }

        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            console.log("Response:", response);
            const data = await response.json();
            if (response.ok) {
                toast.success('Workout updated successfully.');
                refreshPage();
            } else {
                toast.error(data.message || 'Unable to mark workout as completed');}            
        } catch (error) {
            console.error('Error marking workout as completed:', error);
            toast.error('Unable to mark workout as completed');
        }
    }

    return (
        <div className="workout-dashboard">
            <h1 className="dashboard-title">Workouts</h1>
            <div>
                <Button className="m-2" variant="info" onClick={() => setView('addWorkout')}>Add Workout</Button>
                <Button className="m-2" variant="info" onClick={() => refreshPage()}>Get Workouts</Button>
                <Button className="m-2" variant="info" onClick={() => setView('updateWorkout')}>Update Workout</Button>
                <Button className="m-2" variant="info" onClick={() => setView('deleteWorkout')}>Delete Workout</Button>
                <Button className="m-2" variant="info" onClick={() => setView('completeWorkoutStatus')}>Complete Workout</Button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {view === 'addWorkout' && (
                        <Form onSubmit={addWorkout} className="mt-4">
                            <h3>Add Workout</h3>
                            <Form.Group controlId="workoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout name"
                                    value={newWorkout.name}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, name: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutDuration">
                                <Form.Label>Workout Duration</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout duration"
                                    value={newWorkout.duration}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, duration: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">Add Workout</Button>
                        </Form>
                    )}

                    {view === 'getWorkouts' && (
                        <div className="mt-4">
                            <h3>Workouts List</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workouts.map((workout) => (
                                        <tr key={workout._id}>
                                            <td>{workout._id}</td>
                                            <td>{workout.name}</td>
                                            <td>{workout.duration}</td>
                                            <td>{workout.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    {view === 'updateWorkout' && (
                        <Form onSubmit={updateWorkout} className="mt-4">
                            <h3>Update Workout</h3>
                            <Form.Group controlId="workoutId">
                                <Form.Label>Workout ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout ID"
                                    value={workoutId}
                                    onChange={(e) => setWorkoutId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout name"
                                    value={workoutName}
                                    onChange={(e) => setWorkoutName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutDuration">
                                <Form.Label>Workout Duration</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout duration"
                                    value={workoutDuration}
                                    onChange={(e) => setWorkoutDuration(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">Update Workout</Button>
                        </Form>
                    )}

                    {view === 'deleteWorkout' && (
                        <Form onSubmit={deleteWorkout} className="mt-4">
                            <h3>Delete Workout</h3>
                            <Form.Group controlId="workoutId">
                                <Form.Label>Workout ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout ID"
                                    value={workoutId}
                                    onChange={(e) => setWorkoutId(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="danger" type="submit" className="mt-3">Delete Workout</Button>
                        </Form>
                    )}

                {view === 'completeWorkoutStatus' && (
                    <Form className="mt-4">
                        <h3>Complete Workout Status</h3>
                        <Form.Group controlId="workoutId">
                            <Form.Label>Workout ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout ID"
                                value={workoutId}
                                onChange={(e) => setWorkoutId(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="success"
                            className="mt-3"
                            onClick={() => {
                                if (!workoutId) {
                                    toast.error('Please enter a Workout ID');
                                    return;
                                }
                                completeWorkoutStatus(workoutId);
                            }}
                        >
                            Complete Workout
                        </Button>
                    </Form>
                )}
                </>
            )}
        </div>
    );
}

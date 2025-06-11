import NewTask from "./NewTask.jsx";

export default function Tasks({tasks, onDelete, onAdd}) {
    return (
        <section>
            <h2 className={"text-2xl font-bold text-stone-700 mb-4"}>Tasks</h2>
            <NewTask onAdd={onAdd} onDelete={onDelete}/>
            <p className={"text-stone-800 my-4"}>
                No Tasks Available
            </p>

        </section>
    )
}
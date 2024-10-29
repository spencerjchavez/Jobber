
const GetInTouchSidebar: React.FC = () => {
    return <form className="form-primary get-in-touch-sidebar-form">
        <div className="row g-0">
        <div className="col-12">
                <label className="label-primary">First Name</label>
                <input className="input-single-line" type="text" />
            </div>
            <div className="col-12">
                <label className="label-primary">Last Name</label>
                <input className="input-single-line" type="text" />
            </div>
            <div className="col-12">
                <label className="label-primary">Email</label>
                <input className="input-single-line" type="text" />
            </div>
            <div className="col-12">
                <label className="label-primary">Phone</label>
                <input className="input-single-line" type="text" />
            </div>
            <div className="col-12">
                <label className="label-primary">How can we help?</label>
                <input className="input-multiline-medium" type="text" />
            </div>
            <div className="col-12">
                <a type="submit" className="btn btn-standard color-primary w-100">Get A Quote</a>
            </div>
        </div>
    </form>
}

export default GetInTouchSidebar;
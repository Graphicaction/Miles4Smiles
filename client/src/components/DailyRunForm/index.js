import React from "react";


function DailyRunForm() {

    return (
        <>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Enter a user to challenge</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" class="form-text text-muted">***Later this will be users db search***</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Which Biz will you run for?</label>
                    <input class="form-control" type="text" placeholder="Enter business name"></input>
                    <small id="emailHelp" class="form-text text-muted">***Later this will be Local Business API search***</small>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Select Biz type:</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Retail</option>
                        <option>Education</option>
                        <option>Food/Beverage</option>
                        <option>Tech</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Let's talk milage 🏁</label>
                    <input class="form-control form-control-sm" type="text" placeholder="Enter proposed challenge distance in miles"></input>
                    <input class="form-control form-control-sm" type="text" placeholder="Enter donation amount per mile in USD"></input>
                </div>
            </form>
        </>
    )
}

export default DailyRunForm;
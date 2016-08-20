import React from 'react'

export default class Items extends React.Component {
	render() {
		const items = this.props.items
		return(
			<div className="brand-box">
				<ul>
					{items.map((item, i) =>
						<li key={item.id}>
							<a href={item.id} data-type={item.name} key={item.id}>
								<i></i>
							</a>
							<div className="brand-btn-group">
								{item.child.map((c,i) =>
									(i < 4 ? <a className="btn" href="" key={c.id}>{c.name}</a> : '')
								)}
							</div>
						</li>
					)}
				</ul>
			</div>
		)
	}
}

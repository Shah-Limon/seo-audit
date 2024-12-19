import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { CSVLink } from "react-csv";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Activity, Box, ChartNoAxesColumn, UserRound } from "lucide-react";

const MyAllLeads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => setMyLeads(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/lists`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  const getUserLeadsAsCSV = () => {
    const userLeads = myLeads.filter((lead) => user?.email === lead.leadAdded);
    const csvData = [
      ["Name", "Email", "Title", "Website", "Location", "industry", "Loading Speed", "SEO Score", "CMS", "Traffic"],
      ...userLeads.map((lead) => [
        lead.personName,
        lead.personEmail,
        lead.title,
        lead.website,
        lead.location,
        lead.industry,
        lead.loadingSpeed,
        lead.seoScore,
        lead.cms,
        lead.traffic,
      ]),
    ];
    return csvData;
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = myLeads
    .filter((lead) => user?.email === lead.leadAdded)
    .slice(indexOfFirstLead, indexOfLastLead);

  const totalLeads = myLeads.filter(
    (lead) => user?.email === lead.leadAdded
  ).length;

  const totalPages = Math.ceil(totalLeads / leadsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      const maxPages = 3;
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (currentPage === 1) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage === totalPages) {
        startPage = totalPages - (maxPages - 1);
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchName, SetSearchName] = useState("");
  const [searchWebsite, SetSearchWebsite] = useState("");

  const handleTitleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleLocationSearch = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleIndustrySearch = (event) => {
    setSearchIndustry(event.target.value);
  };

  const handleNameSearch = (event) => {
    SetSearchName(event.target.value);
  };
  const handleWebsiteSearch = (event) => {
    SetSearchWebsite(event.target.value);
  };

  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    const filteredLeads = myLeads.filter((lead) => {
      return (
        user?.email === lead.leadAdded &&
        lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        lead.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
        lead.personName.toLowerCase().includes(searchName.toLowerCase()) &&
        lead.website.toLowerCase().includes(searchWebsite.toLowerCase())
      );
    });
    setCurrentPage(1);
    setFilteredLeads(filteredLeads);
  }, [
    searchTitle,
    searchLocation,
    searchIndustry,
    myLeads,
    searchName,
    user,
    searchWebsite,
  ]);

  const handleLeadSelect = (leadId) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads((prevSelected) =>
        prevSelected.filter((id) => id !== leadId)
      );
    } else {
      setSelectedLeads((prevSelected) => [...prevSelected, leadId]);
    }
  };

  const handleDeleteLeads = () => {
    fetch(`http://localhost:5000/delete-my-leads`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leads: selectedLeads,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Delete Successfully!")
        console.log(data);
        setMyLeads((prevLeads) =>
          prevLeads.filter((lead) => !selectedLeads.includes(lead._id))
        );
        setSelectedLeads([]);
      })
      .catch((error) => {
        console.error("Error deleting leads:", error);
      });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  // Step 3: Function to show modal and set listToDelete
  const handleShowDeleteModal = (listId) => {
    setListToDelete(listId);
    setShowDeleteModal(true);
  };

  // Step 4: Function to handle list deletion
  const handleDeleteList = () => {
    // Your delete list logic here...

    fetch(`http://localhost:5000/delete-list/${listToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Close the modal after successful deletion
        setShowDeleteModal(false);

        // Optional: You may want to update the local state to reflect the changes
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listToDelete)
        );
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
      });
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Lists Grid Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="row g-4">
            {lists.map(
              (list) =>
                list.listCreatedBy === user?.email && (
                  <div className="col-lg-2 col-md-3 col-sm-6" key={list._id}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '1rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      cursor: 'pointer',
                    }}>
                      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <Link
                          to={`/list/${list._id}`}
                          style={{ textDecoration: 'none', color: '#2c3e50' }}
                        >
                          <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{list.listName}</h4>
                        </Link>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Link
                          to={`/edit-list/${list._id}`}
                          style={{ color: '#6c757d' }}
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={() => handleShowDeleteModal(list._id)}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: '#dc3545',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: '600'
          }}>
            My Collected Leads: {myLeads.filter((my) => my.leadAdded === user?.email).length}
          </h2>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <CSVLink
              data={getUserLeadsAsCSV()}
              filename="user_leads.csv"
              className="btn"
              style={{
                backgroundColor: '#4361ee',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
            >
              Download CSV
            </CSVLink>

            <Link
              to="/create-list"
              className="btn"
              style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className="fas fa-plus"></i> New List
            </Link>
          </div>
        </div>

        {/* Search Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div className="row g-3">
            {[
              { placeholder: "Search by Title", value: searchTitle, onChange: handleTitleSearch },
              { placeholder: "Search by Location", value: searchLocation, onChange: handleLocationSearch },
              { placeholder: "Search by Industry", value: searchIndustry, onChange: handleIndustrySearch },
              { placeholder: "Search by Name", value: searchName, onChange: handleNameSearch },
              { placeholder: "Search by Website", value: searchWebsite, onChange: handleWebsiteSearch }
            ].map((field, index) => (
              <div className="col-md-2" key={index}>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
            <button
              onClick={handleDeleteLeads}
              className="btn"
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Delete Selected
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '1000px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#6c5ce7' }}>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  </th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>No.</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Name & Title</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Website</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Performance</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Industry</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>List</th>
                  <th style={{ padding: '1rem', color: 'white', fontWeight: '600', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads
                  .slice(indexOfFirstLead, indexOfLastLead)
                  .map((lead, i) => (
                    <tr
                      key={lead._id}
                      style={{
                        borderBottom: '1px solid #dee2e6',
                        backgroundColor: i % 2 === 0 ? '#f8f9fa' : 'white'
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={() => handleLeadSelect(lead._id)}
                          style={{ width: '16px', height: '16px' }}
                        />
                      </td>
                      <td style={{ padding: '1rem' }}>{i + 1 + indexOfFirstLead}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '500' }}>{lead.personName}</div>
                        <div style={{ color: '#4361ee', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <UserRound size={16} />
                          {lead.title}
                        </div>

                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{lead.personEmail}</div>
                        <div style={{ color: '#2ecc71', fontSize: '0.9rem' }}>• Valid Email</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{lead.website}</div>
                        <div style={{ color: '#6c757d', fontSize: '0.9rem' }}><ChartNoAxesColumn />- Traffic: {lead.traffic}</div>
                        <div style={{ color: '#6c757d', fontSize: '0.9rem' }}><Box absoluteStrokeWidth />- CMS: {lead.cms}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>SEO Score: {lead.seoScore}</div>
                        <div style={{ color: '#dc3545', fontSize: '0.9rem' }}>-Loading Speed: Poor</div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div>{lead.industry}</div>
                        <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>- eCommerce</div>
                      </td>
                      <td style={{ padding: '1rem' }}>{lead.leadAddedToList}</td>
                      <td>
                        <Link
                          to={`/add-lead/${lead._id}`}
                          className="btn"
                          style={{
                            backgroundColor: '#4361ee',
                            color: 'white',
                            padding: '0.5rem 0.1rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          Add to list
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <ul className="pagination" style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
              {getPageNumbers()}
            </ul>
          </nav>
        )}

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton style={{ border: 'none', padding: '1.5rem 1.5rem 0.5rem' }}>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '1rem 1.5rem' }}>
            Are you sure you want to delete this list?
          </Modal.Body>
          <Modal.Footer style={{ border: 'none', padding: '0.5rem 1.5rem 1.5rem' }}>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              style={{
                backgroundColor: '#6c757d',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px'
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteList}
              style={{
                backgroundColor: '#dc3545',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                marginLeft: '0.5rem'
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
};

export default MyAllLeads;
